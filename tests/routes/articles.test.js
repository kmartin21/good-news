const { expect, assert } = require('chai')
const nock = require('nock')
const httpMocks = require('node-mocks-http')
const Sentiment = require('sentiment')
require('dotenv').config()

const articles = require('../fixtures/articles.json')
const dupArticles = require('../fixtures/dupArticles.json')
const { getTopArticles } = require('../../controllers/articles.controller')

describe('Articles', () => {

    describe('Top articles', () => {
        it('should fetch positive news articles', (done) => {
            nock('https://newsapi.org')
            .get(`/v2/everything?domains=techradar.com,medicalnewstoday.com,businessinsider.com&language=en&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`)
            .reply(200, articles)

            const sentiment = new Sentiment()
            const positiveArticles = articles.articles.filter(article => {
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

        it('should return unique articles', (done) => {
            nock('https://newsapi.org')
            .get(`/v2/everything?domains=techradar.com,medicalnewstoday.com,businessinsider.com&language=en&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`)
            .reply(200, dupArticles)

            const expectedData = {
                data: {
                    articles: [dupArticles.articles[0]]
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

        describe('news api returns an error', () => {
            it('should respond with a 500 error', (done) => {
                nock('https://newsapi.org')
                .get(`/v2/everything?domains=techradar.com,medicalnewstoday.com,businessinsider.com&language=en&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`)
                .replyWithError('Servers are down')

                let req  = httpMocks.createRequest({
                    method: 'GET',
                    url: '/api/v1/top-stories'
                })
    
                let res = httpMocks.createResponse({
                    eventEmitter: require('events').EventEmitter
                })
    
                res.on('end', () => {
                    const data = JSON.parse(res._getData())
                    expect(res.statusCode).to.equal(500)
                    assert(data.message != null)
                    done()
                })
    
                getTopArticles(req, res)
            })
        })
    })
})

