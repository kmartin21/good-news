import React from 'react'
import App from '../App'
import { mount } from 'enzyme'
import { MemoryRouter, withRouter } from 'react-router'
import ErrorPage from '../../components/ErrorPage'
import Nav from '../../containers/Nav'
import SignUpPage from '../../components/SignUpPage'
import Home from '../Home'

describe('App', () => {
  describe('/user/:googleId/profile path', () => {
    const mountedApp = mount(
      <MemoryRouter initialEntries={[ '/user/12345/profile' ]}>
          <App />
      </MemoryRouter>
    )

    beforeEach(() => {
      localStorage.setItem("googleId", "12345")
    })

    it('should render a div', () => {
      expect(mountedApp.find('div').length).toBeGreaterThan(0)
    })

    it('should render a Nav', () => {
      expect(mountedApp.find(Nav).length).toBeGreaterThan(0)
    })
  })

  describe('/sign-up path', () => {
    const mountedApp = mount(
      <MemoryRouter initialEntries={[ '/sign-up' ]}>
          <App />
      </MemoryRouter>
    )

    it('should render a div', () => {
        expect(mountedApp.find('div').length).toBeGreaterThan(0)
    })

    it('should render a Nav', () => {
      expect(mountedApp.find(Nav).length).toBeGreaterThan(0)
    })

    it('should render a SignUpPage', () => {
      expect(mountedApp.find(SignUpPage).length).toBeGreaterThan(0)
    })
  })

  describe('/user path', () => {
    const RouterApp = withRouter(App)
    const mountedApp = mount(
      <MemoryRouter initialEntries={[ '/user' ]}>
          <RouterApp />
      </MemoryRouter>
    )

    it('always renders a redirect to /', () => {
      expect(mountedApp.find(App).props().location.pathname).toEqual("/")
    })
  })

  describe('/ path', () => {
    const mountedApp = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
          <App />
      </MemoryRouter>
    )

    it('should render a div', () => {
      expect(mountedApp.find('div').length).toBeGreaterThan(0)
    })

    it('should render a Nav', () => {
      expect(mountedApp.find(Nav).length).toBeGreaterThan(0)
    })

    it('should render a Home', () => {
      expect(mountedApp.find(Home).length).toBeGreaterThan(0)
    })
  })

  describe('Invalid path', () => {
    const mountedApp = mount(
      <MemoryRouter initialEntries={[ '/FOO' ]}>
          <App />
      </MemoryRouter>
    )

    it('should render a div', () => {
      expect(mountedApp.find('div').length).toBeGreaterThan(0)
    })

    it('should render a Nav', () => {
      expect(mountedApp.find(Nav).length).toBeGreaterThan(0)
    })

    it('should render a ErrorPage', () => {
      expect(mountedApp.find(ErrorPage).length).toBeGreaterThan(0)
    })

    describe('the rendered ErrorPage', () => {
      const mountedApp = mount(
        <MemoryRouter initialEntries={[ '/FOO' ]}>
            <App />
        </MemoryRouter>
      )

      it('should have its errorMessage prop set', () => {
        expect(mountedApp.find(ErrorPage).props().errorMessage).toBeDefined()
      })
    })
  })
})


