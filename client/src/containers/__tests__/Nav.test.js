import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Container, Menu, Segment } from 'semantic-ui-react'
import Nav from '../Nav'

describe('Nav', () => {
    let mountedNav

    beforeEach(() => {
        mountedNav = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <Nav />
            </MemoryRouter>
        )
    })

    it('should render a Segment', () => {
        expect(mountedNav.find(Segment).length).toBeGreaterThan(0)
    })

    it('should render a Menu', () => {
        expect(mountedNav.find(Menu).length).toBeGreaterThan(0)
    })

    it('should render a Container', () => {
        expect(mountedNav.find(Container).length).toBeGreaterThan(0)
    })

    it('should render a Menu Item', () => {
        expect(mountedNav.find(Menu.Item).length).toBeGreaterThan(0)
    })

    describe('when a user is logged in', () => {
        let mountedNav

        beforeEach(() => {
            localStorage.setItem("username", "Keith")
            mountedNav = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Nav />
                </MemoryRouter>
            )
        })

        it('should render a Menu Menu', () => {
            expect(mountedNav.find(Menu.Menu).length).toBeGreaterThan(0)
        })

        it('should render Menu Items', () => {
            expect(mountedNav.find(Menu.Item).length).toBeGreaterThan(0)
        })

        describe('the rendered Menu Items', () => {
            it('should have its onClick defined', () => {
                const menuItems = mountedNav.find(Menu.Item)
                for(let menuItem in menuItems) {
                    expect(menuItem.props().onClick).toBeDefined()
                }
            })
        })
    })

    describe('when a user is not logged in', () => {
        let mountedNav

        beforeEach(() => {
            localStorage.removeItem("username")
            mountedNav = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Nav />
                </MemoryRouter>
            )
        })

        it('should render a Menu Menu', () => {
            expect(mountedNav.find(Menu.Menu).length).toBeGreaterThan(0)
        })

        it('should render Menu Items', () => {
            expect(mountedNav.find(Menu.Item).length).toBeGreaterThan(0)
        })

        describe('the rendered Logo Menu Item', () => {
            it('should have its onClick defined', () => {
                const menuItem = mountedNav.find(Menu.Item).first()
                expect(menuItem.props().onClick).toBeDefined()
            })
        })

        describe('the rendered Login Menu Item', () => {
            it('should have its href defined', () => {
                expect(mountedNav.find(Menu.Item).at(1).props().href).toBeDefined()
            })
        })
    })
})