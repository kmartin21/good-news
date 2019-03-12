const { expect, assert } = require('chai')
const httpMocks = require('node-mocks-http')
const sinon = require('sinon')

const User = require('../../models/user.model')
const Article = require('../../models/article.model')
const { saveArticle, loginUser } = require('../../controllers/user.controller')

describe('User routes', () => {

    var sandbox = sinon.createSandbox()

    describe('Login', () => {

        it('should login and save a new user to the db', () => {
            const expectedUser = {
                username: 'Joe',
                googleId: '12345',
                savedArticles: [
                    {
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
                    }
                ]
            }

            let saveMock = sandbox.mock(User)
                           .expects('findOneAndUpdate')
                           .yields(null, expectedUser)
                           
            let validateUserMock = sandbox.mock(User.prototype)
                               .expects('validate')
                               .yields(null)

            let req  = httpMocks.createRequest({
                method: 'GET',
                url: '/api/v1/auth/google/callback',
                user: {
                    username: 'Joe',
                    googleId: '12345'
                }
            })

            let res = httpMocks.createResponse()

            loginUser(req, res)

            const data = JSON.parse(res._getData())

            assert(saveMock.calledOnce)
            assert(validateUserMock.calledOnce)
            expect(res.statusCode).to.equal(200)
            expect(data).to.eql({ data: { user: expectedUser } })
            
            sandbox.verify()
            sandbox.restore()
        })
    })

    describe('Articles', () => {

        it('should save an article for a user', () => {
            sandbox = sinon.createSandbox()

            let updateMock = sandbox.mock(User)
                            .expects('update')
                            .yields(null, null)

            let validateMock = sandbox.mock(Article.prototype)
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

            sandbox.verify()
            sandbox.restore()
        })

        describe('Body with incorrect fields', () => {

            let req  = httpMocks.createRequest({
                method: 'POST',
                url: '/api/v1/users/12345/articles',
                body: {
                    source: {
                        id: "cnn",
                        name: "CNN"
                    },
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

            it('should respond with a 500 error', () => {
                sandbox = sinon.createSandbox()

                let validateMock = sandbox.mock(Article.prototype)
                                   .expects('validate')
                                   .yields(new Error('Missing fields'))

                let res = httpMocks.createResponse()

                saveArticle(req, res)

                const data = JSON.parse(res._getData())

                expect(validateMock.calledOnce)
                expect(res.statusCode).to.equal(400)
                assert(data.message != null)

                sandbox.verify()
                sandbox.restore()
            })
        })

        describe('User is not logged in', () => {

            let req  = httpMocks.createRequest({
                method: 'GET',
                url: '/api/v1/auth/google/callback',
                user: null
            })

            it('should respond with a 401 error', () => {
                let res = httpMocks.createResponse()

                saveArticle(req, res)

                const data = JSON.parse(res._getData())

                expect(res.statusCode).to.equal(401)
                assert(data.message != null)
            })
        })

        describe('Mongoose error updating user', () => {

            it('should respond with a 500 error', () => {
                sandbox = sinon.createSandbox()

                let updateMock = sandbox.mock(User)
                                .expects('update')
                                .yields(new Error('Could not find user'), null)

                let validateMock = sandbox.mock(Article.prototype)
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
                        author: 'Joe',
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

                const data = JSON.parse(res._getData())

                expect(validateMock.calledOnce)
                expect(updateMock.calledOnce)
                expect(res.statusCode).to.equal(500)
                assert(data.message != null)  

                sandbox.verify()
                sandbox.restore()
            })
        })
    })
})
