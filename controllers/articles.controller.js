const axios = require('axios')
const Sentiment = require('sentiment')
require('dotenv').config()

exports.getTopArticles = (req, res) => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
    .then(response => {
        const sentiment = new Sentiment()
        const positiveArticles = response.data.articles.filter(article => {
            const content = article.title + " " + article.description
            const result = sentiment.analyze(content)
            return result.score > 1
        })

        res.status(200).json({
            data: {
                articles: positiveArticles
            }
        })
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting top headlines' })
    })
}