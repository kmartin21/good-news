import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Header, Grid, Divider } from 'semantic-ui-react'
import Profile from '../Profile'
import Articles from '../Articles';

describe('Profile', () => {
    let mountedProfile

    beforeEach(() => {
        mountedProfile = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <Profile />
            </MemoryRouter>
        )
    })

    it('should render a div', () => {
        expect(mountedProfile.find('div').length).toBeGreaterThan(0)
    })

    describe('when the user information network request is returned and ok', () => {
        let mountedProfile

        beforeEach(() => {
            mountedProfile = mount(
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Profile />
                </MemoryRouter>
            )
            mountedProfile.setState({user: {username: "Keith", savedArticles: []}})
        })

        it('should render a Grid', () => {
            expect(mountedProfile.find(Grid).length).toBeGreaterThan(0)
        }) 

        it('should render a Grid Row', () => {
            expect(mountedProfile.find(Grid.Row).length).toBeGreaterThan(0)
        }) 

        it('should render a Grid Column', () => {
            expect(mountedProfile.find(Grid.Column).length).toBeGreaterThan(0)
        })
        
        it('should render a Header', () => {
            expect(mountedProfile.find(Header).length).toBeGreaterThan(0)
        })

        it('should render a Divider', () => {
            expect(mountedProfile.find(Divider).length).toBeGreaterThan(0)
        })

        it('should render a Articles', () => {
            expect(mountedProfile.find(Articles).length).toBeGreaterThan(0)
        })

        describe('the rendered Articles', () => {
            it('should have its articles prop set', () => {
                expect(mountedProfile.find(Articles).props().articles).toBeDefined()
            })

            it('should have its divideVertically prop set', () => {
                expect(mountedProfile.find(Articles).props().divideVertically).toBeDefined()
            })
        })
    })
})