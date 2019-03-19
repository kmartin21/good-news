import React from 'react'
import ErrorPage from '../ErrorPage'
import { shallow } from 'enzyme'
import { Container, Header } from 'semantic-ui-react'

describe('ErrorPage', () => {
    let props
    let shallowErrorPage

    beforeEach(() => {
        props = {
            errorMessage: "404. Looks like you're a bit lost, we couldn't find that page."
        }
        shallowErrorPage = shallow(<ErrorPage {...props} />)
    })

    it('always renders a Container', () => {
        expect(shallowErrorPage.find(Container).length).toBeGreaterThan(0)
    })

    describe('the rendered Container', () => {

        it('should contain everything else that gets rendered', () => {
            const components = shallowErrorPage.find(Container)
            const wrappingContainer = components.first()

            expect(wrappingContainer.children()).toEqual(shallowErrorPage.children())
        })
    })

    it('always renders a Header', () => {
        expect(shallowErrorPage.find(Header).length).toBeGreaterThan(0)
    })
})