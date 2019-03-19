import React from 'react'
import Articles from '../Articles'
import { shallow } from 'enzyme'
import { Grid, Header, Divider } from 'semantic-ui-react'
import Home from '../../containers/Home'
import ErrorPage from '../../components/ErrorPage'

describe('Home', () => {
    let shallowHome

    beforeEach(() => {
        shallowHome = shallow(<Home />)
    })

    it('should render a div', () => {
        expect(shallowHome.find('div').length).toBeGreaterThan(0)
    })

    describe('the rendered div', () => {
        it('should contain everything else that gets rendered', () => {
            const components = shallowHome.find('div')
            const wrappingContainer = components.first()

            expect(wrappingContainer.children()).toEqual(shallowHome.children())
        })
    })

    describe('when there is a network error', () => {
        beforeEach(() => {
            shallowHome.setState({errorMessage: '500. Oops, we are working on this'})
        })

        it('should render a errorPage', () => {
            expect(shallowHome.find(ErrorPage).length).toBeGreaterThan(0)
        })

        describe('rendered ErrorPage', () => {
            it('should have its errorMessage prop set', () => {
                expect(shallowHome.find(ErrorPage).props().errorMessage).toBeDefined()
            })
        })
    })

    it('should render a Grid', () => {
        expect(shallowHome.find(Grid).length).toBeGreaterThan(0)
    })

    it('should render a Grid Row', () => {
        expect(shallowHome.find(Grid.Row).length).toBeGreaterThan(0)
    })    

    it('should render a Grid Column', () => {
        expect(shallowHome.find(Grid.Column).length).toBeGreaterThan(0)
    })

    it('should render a Header', () => {
        expect(shallowHome.find(Header).length).toBeGreaterThan(0)
    })

    it('should render a Divider', () => {
        expect(shallowHome.find(Divider).length).toBeGreaterThan(0)
    })

    it('should render a Articles', () => {
        expect(shallowHome.find(Articles).length).toBeGreaterThan(0)
    })

    describe('the rendered Articles', () => {
        it('should have its articles prop set', () => {
            expect(shallowHome.find(Articles).props().articles).toBeDefined()
        })

        it('should have its divideVertically prop set', () => {
            expect(shallowHome.find(Articles).props().divideVertically).toBeDefined()
        })
    })

    
})
