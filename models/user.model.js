const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Article = require('./article.model').schema

const UserSchema = new Schema({
    username: String,
    googleId: { type: String, required: true },
    savedArticles: [Article]
})

const User = mongoose.model('User', UserSchema)

module.exports = User
