const { expect, assert } = require('chai')
const httpMocks = require('node-mocks-http')
const sinon = require('sinon')

const User = require('../../models/user.model')
const Article = require('../../models/article.model')
const { saveArticle, loginUser, deleteArticle, getAllArticles, getUser } = require('../../controllers/user.controller')

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

            assert(saveMock.calledOnce)
            assert(validateUserMock.calledOnce)
            
            sandbox.verify()
            sandbox.restore()
        })
    })

    it('should get all info for a specified user', () => {
        sandbox = sinon.createSandbox()

        const expectedUser = {
            "user" : {
                "_id": "5c6d8d6d7f0e52717ce087af",
                "username": "Keith Martin",
                "googleId": "112762634690233160746",
                "__v": 0,
                "savedArticles": []
            }
        }

        let findMock = sandbox.mock(User)
                        .expects('findOne')
                        .yields(null, expectedUser)

        let req  = httpMocks.createRequest({
            method: 'GET',
            url: '/api/v1/users/12345/articles',
            params: {
                googleId: 12345
            }
        })

        let res = httpMocks.createResponse()

        getUser(req, res)

        const data = JSON.parse(res._getData())

        expect(findMock.calledOnce)
        expect(res.statusCode).to.equal(200)
        expect(data).to.eql({ data: {user: expectedUser }})

        sandbox.verify()
        sandbox.restore()
    })

    describe('Articles', () => {
        describe('Saving an article', () => {
            it('should save an article for a user', () => {
                sandbox = sinon.createSandbox()
    
                let updateMock = sandbox.mock(User)
                                .expects('findOneAndUpdate')
                                .yields(null, {_id: '12332'})
    
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
                    },
                    params: {
                        googleId: 12345
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
                    },
                    params: {
                        googleId: 12345
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
                    method: 'POST',
                    url: '/api/v1/users/12345/articles',
                    params: {
                        googleId: 12345
                    },
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
                                    .expects('findOneAndUpdate')
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
                        },
                        params: {
                            googleId: 12345
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

        describe('Deleting a article', () => {
            it('should remove an article for a user', () => {
                sandbox = sinon.createSandbox()
    
                let updateMock = sandbox.mock(User)
                                .expects('findOneAndUpdate')
                                .yields(null, {_id: '12332'})
    
                let req  = httpMocks.createRequest({
                    method: 'PUT',
                    url: '/api/v1/users/12345/articles/3321',
                    params: {
                        googleId: 12345,
                        articleId: 3321
                    },
                    user: {
                        googleId: '123'
                    }
                })
    
                let res = httpMocks.createResponse()
    
                deleteArticle(req, res)
    
                assert(updateMock.calledOnce)
                expect(res.statusCode).to.equal(200)
    
                sandbox.verify()
                sandbox.restore()
            })

            describe('User is not logged in', () => {
                it('should respond with a 401 error', () => {
                    let req  = httpMocks.createRequest({
                        method: 'PUT',
                        url: '/api/v1/users/12345/articles/3321',
                        params: {
                            googleId: 12345,
                            articleId: 3321
                        },
                        user: null
                    })

                    let res = httpMocks.createResponse()

                    saveArticle(req, res)

                    const data = JSON.parse(res._getData())

                    expect(res.statusCode).to.equal(401)
                    assert(data.message != null)
                })
            })

            describe('Mongoose error deleting article', () => {
                it('should respond with a 500 error', () => {
                    sandbox = sinon.createSandbox()
    
                    let updateMock = sandbox.mock(User)
                                    .expects('findOneAndUpdate')
                                    .yields(new Error('Mongoose error'), null)
        
                    let req  = httpMocks.createRequest({
                        method: 'PUT',
                        url: '/api/v1/users/12345/articles/3321',
                        params: {
                            googleId: 12345,
                            articleId: 3321
                        },
                        user: {
                            googleId: '123'
                        }
                    })
        
                    let res = httpMocks.createResponse()
        
                    deleteArticle(req, res)
        
                    const data = JSON.parse(res._getData())

                    assert(updateMock.calledOnce)
                    expect(res.statusCode).to.equal(500)
                    assert(data.message != null)
        
                    sandbox.verify()
                    sandbox.restore()
                })
            })
        })

        describe('Get all articles', () => {
            it('should return all saved articles for a specified user', () => {
                sandbox = sinon.createSandbox()

                const expectedArray = [
                    {
                        "source": {
                            "id": "cnn",
                            "name": "CNN"
                        },
                        "author": "Frank Pallotta, CNN",
                        "title": "'Us' scares up screams and applause at SXSW premiere - CNN",
                        "description": "Jordan Peele is up to his old tricks. The director of \"Get Out\" was in Austin, Texas on Friday to premiere his latest horror and psychological thriller, \"Us.\"",
                        "url": "https://www.cnn.com/2019/03/09/entertainment/us-premiere/index.html",
                        "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/181226152851-02-us-trailer-screengrab-jordan-peele-super-tease.jpg",
                        "publishedAt": "2019-03-09T15:24:00Z",
                        "content": "It should surprise no one that US is a very satisfying (and anxiety-inducing) follow up to GET OUT. What's more fascinating: that a high-concept FUNNY GAMES/Hitchcock/Cronenberg/Bradbury mashup could feel so fresh at the same time. #sxsw — erickohn (@erickohn… [+14 chars]"
                    }
                ]
    
                let findMock = sandbox.mock(User)
                                .expects('findOne')
                                .yields(null, {
                                    savedArticles: expectedArray
                                })

                let req  = httpMocks.createRequest({
                    method: 'GET',
                    url: '/api/v1/users/12345/articles',
                    params: {
                        googleId: 12345
                    }
                })
    
                let res = httpMocks.createResponse()

                getAllArticles(req, res)

                const data = JSON.parse(res._getData())

                expect(findMock.calledOnce)
                expect(res.statusCode).to.equal(200)
                expect(data).to.eql({ data: { savedArticles: expectedArray } })

                sandbox.verify()
                sandbox.restore()
            })

            describe('Mongoose error getting articles', () => {
                it('should respond with a 500 error', () => {
                    sandbox = sinon.createSandbox()

                    let findMock = sandbox.mock(User)
                                .expects('findOne')
                                .yields(new Error('Error finding user'), null)

                    let req  = httpMocks.createRequest({
                        method: 'GET',
                        url: '/api/v1/users/12345/articles',
                        user: {
                            googleId: '123'
                        },
                        params: {
                            googleId: 12345
                        }
                    })
        
                    let res = httpMocks.createResponse()

                    getAllArticles(req, res)

                    const data = JSON.parse(res._getData())

                    expect(findMock.calledOnce)
                    expect(res.statusCode).to.equal(500)
                    assert(data.message != null)

                    sandbox.verify()
                    sandbox.restore()
                })
            })
        })
    })
})
