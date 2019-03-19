import React from 'react'
import Articles from '../Articles'
import { shallow } from 'enzyme'
import { Grid } from 'semantic-ui-react'
import Article from '../../components/Article'
import articlesJSON from './fixtures/articles.json'
import ErrorPage from '../../components/ErrorPage'

describe('Articles', () => {
    let props
    let shallowArticles
    
    beforeEach(() => {
        props = {
            articles: articlesJSON.articles,
            divideVertically: false
        }
        shallowArticles = shallow(<Articles {...props} />)
    })

    it('should render a div', () => {
        expect(shallowArticles.find('div').length).toBeGreaterThan(0)
    })

    describe('the rendered div', () => {
        it('should contain everything else that gets rendered', () => {
            const components = shallowArticles.find('div')
            const wrappingContainer = components.first()

            expect(wrappingContainer.children()).toEqual(shallowArticles.children())
        })
    })

    describe('when there is a network error', () => {
        beforeEach(() => {
            shallowArticles.setState({errorMessage: '500. Oops, we are working on this'})
        })

        it('should render a errorPage', () => {
            expect(shallowArticles.find(ErrorPage).length).toBeGreaterThan(0)
        })

        describe('rendered ErrorPage', () => {
            it('should have its errorMessage prop set', () => {
                expect(shallowArticles.find(ErrorPage).props().errorMessage).toBeDefined()
            })
        })
    })

    it('should render a Grid', () => {
        expect(shallowArticles.find(Grid).length).toBeGreaterThan(0)
    })

    it('should render a Grid Row', () => {
        expect(shallowArticles.find(Grid.Row).length).toBeGreaterThan(0)
    })

    it('should render a Grid Column', () => {
        expect(shallowArticles.find(Grid.Column).length).toBeGreaterThan(0)
    })

    it('should render a Article for each article in the props', () => {
        expect(shallowArticles.find(Article).length).toEqual(props.articles.length)
    })

    describe('the rendered Articles', () => {
        let props
        let shallowArticles
        
        beforeEach(() => {
            props = {
                articles: articlesJSON.articles,
                divideVertically: false
            }
            shallowArticles = shallow(<Articles {...props} />)
        })

        it('should have its title prop set to the article title in the current iteration', () => {
            const articles = shallowArticles.find(Article)

            for(let i = 0; i < props.articles; i++) {
                expect(props.articles[i].title).toEqual(articles[i].title)
            }
        })

        it('should have its description prop set to the article description in the current iteration', () => {
            const articles = shallowArticles.find(Article)

            for(let i = 0; i < props.articles; i++) {
                expect(props.articles[i].description).toEqual(articles[i].description)
            }
        })

        it('should have its url prop set to the article url in the current iteration', () => {
            const articles = shallowArticles.find(Article)

            for(let i = 0; i < props.articles; i++) {
                expect(props.articles[i].url).toEqual(articles[i].url)
            }
        })

        it('should have its urlToImage prop set to the article urlToImage in the current iteration', () => {
            const articles = shallowArticles.find(Article)

            for(let i = 0; i < props.articles; i++) {
                expect(props.articles[i].urlToImage).toEqual(articles[i].urlToImage)
            }
        })

        it('should have its saved prop set to the article saved value in the current iteration', () => {
            const articles = shallowArticles.find(Article)

            for(let i = 0; i < props.articles; i++) {
                expect(props.articles[i].saved).toEqual(articles[i].saved)
            }
        })

        it('should have its toggleSaveArticle prop set for the Article current iteration', () => {
            const articles = shallowArticles.find(Article)

            for(let i = 0; i < props.articles; i++) {
                expect(articles[i].toggleSaveArticle).toBeDefined()
            }
        })
    })
})