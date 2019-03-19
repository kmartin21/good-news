const User = require('../models/user.model')
const Article = require('../models/article.model')
require('dotenv').config()

exports.loginUser = (req, res) => {
    if (!req.user) {
        res.redirect(`${process.env.CLIENT_BASE_URL}`, 500)
        return
    }
    
    const user = new User({
        username: req.user.username ? req.user.username : 'Profile',
        googleId: req.user.googleId
    })

    user.validate((error) => {
        if (error) {
            res.redirect(`${process.env.CLIENT_BASE_URL}`, 400)
            return
        }

        let query = { googleId: req.user.googleId }
        let update = { username: req.user.username }
        let options = { upsert: true, new: true, setDefaultsOnInsert: true }

        User.findOneAndUpdate(query, update, options, (error, user) => {
            if (error) res.redirect(`${process.env.CLIENT_BASE_URL}`, 500)

            res.redirect(`${process.env.CLIENT_BASE_URL}/user?googleId=${req.user.googleId}&username=${req.user.username}`)
        })
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
        
        User.findOneAndUpdate(
            {googleId: req.user.googleId},
            {"$addToSet": { "savedArticles": req.body }},
            {returnOriginal: false},
            (error, result) => {
            if (error) {
                res.status(500).json({ message: 'Error saving article' })
                return
            }
            res.status(200).send()
        })
    })
}

exports.deleteArticle = (req, res) => {
    if (!isLoggedIn(req, res)) return
    
    User.findOneAndUpdate(
        {googleId: req.user.googleId},
        {"$pull": {"savedArticles": {"url": req.body.url}}},
        {returnOriginal: false},
        (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Error deleting article' })
            return
        }

        res.status(200).send()
    })
}

exports.getUser = (req, res) => {
    User.findOne({googleId: req.params.googleId}, (error, user) => {
        if (error) {
            res.status(500).json({ message: 'Error finding user'})
            return
        }

        res.status(200).json({
            data: {
                user: user
            }
        })
    })
}

exports.getAllArticles = (req, res) => {
    User.findOne({googleId: req.params.googleId}, (error, user) => {
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
    if (!req.user) {
        res.status(401).json({ message: 'User is not authorized' })
        return false
    }
    return true
}
