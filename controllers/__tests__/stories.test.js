const stories = require('../../routes/stories.route')
const express = require('express')
const moxios = require('moxios')
const request = require('supertest')

const initStoriesController = () => {
    const app = express()
    app.use('/v1/top-stories', stories)
    return app
}

describe('GET /top-stories', () => {

    beforeEach(() => {
        moxios.install()
    })
    afterEach(() => {
        moxios.uninstall()
    })

    it('should fetch the top news stories', async() => {
        moxios.stubRequest('localhost:7001/v1', {
            status: 200,
            response: {
                data: {
                    articles: [
                        {
                            "source": {
                                "id": null,
                                "name": "Fortniteintel.com"
                            },
                            "author": null,
                            "title": "Epic Games announces the complete Fortnite World Cup format and $30 million New York City tournament - FortniteINTEL",
                            "description": "Epic Games is wrapping up its Competitive Fortnite series with a massive $30,000,000 tournament in New York City. Epic Games has announced the Fortnite World Cup and there is a lot of money up for grabs. The Fortnite World Cup begins with 10 weekly qualifiers…",
                            "url": "https://fortniteintel.com/epic-games-announces-the-complete-fortnite-world-cup-format-and-30-million-new-york-city-tournament/12531/",
                            "urlToImage": "https://fortniteintel.com/wp-content/uploads/2019/02/unnamed.jpg",
                            "publishedAt": "2019-02-22T15:02:00Z",
                            "content": "Epic Games is wrapping up its Competitive Fortnite series with a massive $30,000,000 tournament in New York City. Epic Games has announced the Fortnite World Cup and there is a lot of money up for grabs. The Fortnite World Cup begins with 10 weekly qualifiers… [+2907 chars]"
                        }
                    ]
                }
            }
        })
        const app = initStoriesController()
        await request(app).get('/top-stories')
        expect(moxios.requests.mostRecent().url).toBe('http://localhost:7001/v1/top-stories')
    })

})

