const User = require('../models/user.model')
const Article = require('../models/article.model')

exports.loginUser = (req, res) => {
    const user = new User({...req.body})

    user.validate((error) => {
        if (error) res.status(400).json({message: error})
    })

    let query = {}
    let update = { expire: new Date() }
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }

    User.findOneAndUpdate(query, update, options, (error, result) => {
        if (error) res.status(500).json({ message: 'Error saving user' })

        res.status(200).json({data: {user: req.user}})
    })
}

exports.logoutUser = (req, res) => {
    req.logout()
    res.status(200).json({data: null})
}

exports.saveArticle = (req, res) => {
    if (!req.user) res.status(401).json({ message: 'User is not authorized' })

    const article = new Article({...req.body})
    
    article.validate((error) => {
        if (error) res.status(400).json({message: error})
    })

    User.update(
        {googleId: req.user.googleId},
        {"$push": { "savedArticles": req.body.data }},
        (error, raw) => {
        if (error) res.status(500).json({ message: 'Error saving article' })

        res.status(200).json({data: null})
    })
}
