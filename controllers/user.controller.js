const User = require('../models/user.model')
const Article = require('../models/article.model')

exports.loginUser = (req, res) => {
    if (!req.user) {
        res.status(500).json({ message: 'Error logging in user' })
        return
    }

    const user = new User({...req.user})

    user.validate((error) => {
        if (error) {
            res.status(400).json({message: error})
            return
        }
    })

    let query = { googleId: req.user.googleId }
    let update = { username: req.user.username }
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }

    User.findOneAndUpdate(query, update, options, (error, user) => {
        if (error) res.status(500).json({ message: 'Error saving user' })

        res.status(200).json({data: {user: user}})
    })
}

exports.logoutUser = (req, res) => {
    req.logout()
    res.status(200).json({data: null})
}

exports.saveArticle = (req, res) => {
    if (!isLoggedIn(req, res)) return

    const article = new Article({...req.body})
    
    article.validate((error) => {
        if (error) {
            res.status(400).json({message: error})
            return
        }
    })

    User.findOneAndUpdate(
        {googleId: req.user.googleId},
        {"$addToSet": { "savedArticles": req.body.data }},
        {returnOriginal: false},
        (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error saving article' })
            return
        }

        res.status(200).json({
            data: {
                articleId: result._id
            }
        })
    })
}

exports.deleteArticle = (req, res) => {
    if (!isLoggedIn(req, res)) return

    User.findOneAndUpdate(
        {googleId: req.user.googleId},
        {"$pull": { "savedArticles": req.params.articleId }},
        {returnOriginal: false},
        (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error deleting article' })
            return
        }

        res.status(200)
    })
}

exports.getAllArticles = (req, res) => {
    if (!isLoggedIn(req, res)) return

    User.findOne({googleId: req.user.googleId}, (error, user) => {
        if (error) {
            res.status(500).json({ message: 'Error finding user to get saved articles'})
            return
        }

        res.status(200).json({
            data: {
                savedArticles: user.savedArticles
            }
        })
    })

}

const isLoggedIn = (req, res) => {
    if (req.user == null) {
        res.status(401).json({ message: 'User is not authorized' })
        return false
    }
    return true
}
