const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();
const base = 'http://localhost:7001'

const movies = require('../fixtures/movies.json')

describe('Stories', () => {

    describe('Top stories', () => {
        beforeEach(() => {
            this.get = sinon.stub(request, 'get')
            this.post = sinon.stub(request, 'post')
            this.put = sinon.stub(request, 'put')
            this.delete = sinon.stub(request, 'delete')
        })
      
        afterEach(() => {
            request.get.restore()
            request.post.restore()
            request.put.restore()
            request.delete.restore()
        });

        it('should fetch the top news in the US', (done) => {
            this.get.yields(
                null, movies.all.success.res, JSON.stringify(movies.all.success.body)
            )
            request.get(`${base}/v1/top-stories`, (err, res, body) => {
                res.statusCode.should.eql(200)

                res.headers['content-type'].should.contain('application/json')
                
                body = JSON.parse(body)
                body.data.articles.length.should.eql(3)
                
                body.data.articles[0].title.should.eql('At least 16 diagnosed with mumps at Temple University - NBCNews.com')
                done()
            })
        })
    })
})

