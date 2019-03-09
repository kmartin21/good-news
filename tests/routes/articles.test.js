const { expect } = require('chai')
const nock = require('nock')
const httpMocks = require('node-mocks-http')
const Sentiment = require('sentiment')
require('dotenv').config()

const articles = require('../fixtures/articles.json')
const { getTopArticles } = require('../../controllers/articles.controller')

describe('Articles', () => {

    describe('Top articles', () => {
        it('should fetch the top positive news articles in the US', (done) => {
            nock('https://newsapi.org')
            .get(`/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
            .reply(200, articles)

            const sentiment = new Sentiment()
            const positiveArticles = articles.articles.filter(article => {
                const content = article.title + " " + article.description
                const result = sentiment.analyze(content)
                return result.score > 1
            })

            const expectedData = {
                data: {
                    articles: positiveArticles
                }
            }
            
            let req  = httpMocks.createRequest({
                method: 'GET',
                url: '/api/v1/top-stories'
            })

            let res = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            })

            res.on('end', () => {
                const data = JSON.parse(res._getData())
                expect(res.statusCode).to.equal(200)
                expect(data).to.eql(expectedData)
                done()
            })

            getTopArticles(req, res)
        })
    })
})

