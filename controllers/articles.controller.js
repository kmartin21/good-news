const axios = require('axios')
const Sentiment = require('sentiment')
require('dotenv').config()

exports.getTopArticles = (req, res) => {
    axios.get(`https://newsapi.org/v2/everything?domains=techradar.com,medicalnewstoday.com,businessinsider.com&language=en&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`)
    .then(response => {
        const sentiment = new Sentiment()
        
        const positiveArticles = response.data.articles.filter(article => {
            for (let field in article) {
                if (field === 'title' && article[field] === null ||
                    field === 'description' && article[field] === null ||
                    field === 'url' && article[field] === null ||
                    field === 'urlToImage' && article[field] === null
                ) {
                    return false
                }
            }

            const content = article.title + " " + article.description
            const result = sentiment.analyze(content)
            return result.score > 1
        })

        const positiveArticlesUnique = positiveArticles.filter((article, index) => {
            return positiveArticles.map(articleObj => articleObj.title).indexOf(article.title) === index
        })

        res.status(200).json({
            data: {
                articles: positiveArticlesUnique
            }
        })
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting top headlines' })
    })
}

