const { expect, assert } = require('chai')
const httpMocks = require('node-mocks-http')
const sinon = require('sinon')

const User = require('../../models/user.model')
const Article = require('../../models/article.model')
const { saveArticle } = require('../../controllers/user.controller')

describe('User routes', () => {
    describe('Articles', () => {
        it('should save an article for a user', () => {
            let updateMock = sinon.mock(User)
                            .expects('update')
                            .yields(null, null)

            let validateMock = sinon.mock(Article.prototype)
                               .expects('validate')
                               .yields(null)

            let req  = httpMocks.createRequest({
                method: 'POST',
                url: '/api/v1/users/12345/articles',
                body: {
                    source: {
                        id: "cnn",
                        name: "CNN"
                    },
                    author: "Frank Pallotta, CNN",
                    title: "'Us' scares up screams and applause at SXSW premiere - CNN",
                    description: "Jordan Peele is up to his old tricks. The director of \"Get Out\" was in Austin, Texas on Friday to premiere his latest horror and psychological thriller, \"Us.\"",
                    url: "https://www.cnn.com/2019/03/09/entertainment/us-premiere/index.html",
                    urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/181226152851-02-us-trailer-screengrab-jordan-peele-super-tease.jpg",
                    publishedAt: "2019-03-09T15:24:00Z",
                    content: "It should surprise no one that US is a very satisfying (and anxiety-inducing) follow up to GET OUT. What's more fascinating: that a high-concept FUNNY GAMES/Hitchcock/Cronenberg/Bradbury mashup could feel so fresh at the same time. #sxsw — erickohn (@erickohn… [+14 chars]"
                },
                user: {
                    googleId: '123'
                }
            })

            let res = httpMocks.createResponse()

            saveArticle(req, res)

            assert(updateMock.calledOnce)
            assert(validateMock.calledOnce)
            expect(res.statusCode).to.equal(200)
        })
    })
})
