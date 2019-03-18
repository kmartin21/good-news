import React from 'react'
import SignUpPage from '../SignUpPage'
import { shallow } from 'enzyme'
import { Header, Icon, Button, Container } from 'semantic-ui-react'

describe('SignUpPage', () => {
    let shallowSignUpPage

    beforeEach(() => {
        shallowSignUpPage = shallow(<SignUpPage />)
    })

    it('should render a div', () => {
        expect(shallowSignUpPage.find('div').length).toBeGreaterThan(0)
    })

    describe('the rendered div', () => {
        it('should contain everything else that gets rendered', () => {
            const components = shallowSignUpPage.find('div')
            const wrappingContainer = components.first()

            expect(wrappingContainer.children()).toEqual(shallowSignUpPage.children())
        })
    })

    it('should render a Container', () => {
        expect(shallowSignUpPage.find(Container).length).toBeGreaterThan(0)
    })

    it('should render a Header', () => {
        expect(shallowSignUpPage.find(Header).length).toBeGreaterThan(0)
    })

    it('should render a Button', () => {
        expect(shallowSignUpPage.find(Button).length).toBeGreaterThan(0)
    })

    describe('the rendered Button', () => {
        it('should have its onClick set', () => {
            expect(shallowSignUpPage.find(Button).props().onClick).toBeDefined()
        })
    })

    it('should render a Icon', () => {
        expect(shallowSignUpPage.find(Icon).length).toBeGreaterThan(0)
    })

    it('should render a link', () => {
        expect(shallowSignUpPage.find('a').length).toBeGreaterThan(0)
    })    

    describe('the rendered link', () => {
        it('should have its onClick set', () => {
            expect(shallowSignUpPage.find('a').props().onClick).toBeDefined()
        })
    })


})