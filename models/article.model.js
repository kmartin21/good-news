const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    source: {
        id: String,
        name: String
    },
    author: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    urlToImage: { type: String, required: true },
    publishedAt: String,
    content: String
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
