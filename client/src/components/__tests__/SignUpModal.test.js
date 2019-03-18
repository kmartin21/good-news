import React from 'react'
import SignUpModal from '../SignUpModal'
import { shallow } from 'enzyme'
import { Modal, Header, Icon, Button, Container } from 'semantic-ui-react'

describe('SignUpModal', () => {

    let shallowSignUpModal

    beforeEach(() => {
        shallowSignUpModal = shallow(<SignUpModal />)
    }) 

    it('should render a div', () => {
        expect(shallowSignUpModal.find('div').length).toBeGreaterThan(0)
    })

    describe('the rendered div', () => {
        it('should contain everything else that gets rendered', () => {
            const components = shallowSignUpModal.find('div')
            const wrappingContainer = components.first()

            expect(wrappingContainer.children()).toEqual(shallowSignUpModal.children())
        })
    })

    it('should render a Modal', () => {
        expect(shallowSignUpModal.find(Modal).length).toBeGreaterThan(0)
    })

    describe('the rendered Modal', () => {
        it('should have its trigger set', () => {
            expect(shallowSignUpModal.find(Modal).props().trigger).toBeDefined()
        })
    })

    it('should render a Modal Content', () => {
        expect(shallowSignUpModal.find(Modal.Content).length).toBeGreaterThan(0)
    })

    it('should render a Modal Description', () => {
        expect(shallowSignUpModal.find(Modal.Description).length).toBeGreaterThan(0)
    })

    it('should render a Container', () => {
        expect(shallowSignUpModal.find(Container).length).toBeGreaterThan(0)
    })

    it('should render a Header', () => {
        expect(shallowSignUpModal.find(Header).length).toBeGreaterThan(0)
    })

    it('should render a Button', () => {
        expect(shallowSignUpModal.find(Button).length).toBeGreaterThan(0)
    })

    it('should render a Icon', () => {
        expect(shallowSignUpModal.find(Icon).length).toBeGreaterThan(0)
    })

    it('should render a link', () => {
        expect(shallowSignUpModal.find('a').length).toBeGreaterThan(0)
    })    

    describe('the rendered link', () => {
        it('should have its onClick set', () => {
            expect(shallowSignUpModal.find('a').props().onClick).toBeDefined()
        })
    })
})