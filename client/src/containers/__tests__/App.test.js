import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import ErrorPage from '../../components/ErrorPage'
import Nav from '../../containers/Nav'
import SignUpPage from '../../components/SignUpPage'
import Profile from '../Profile'
import Home from '../Home'

describe('App', () => {
  // it('should render without crashing', () => {
  //   const div = document.createElement('div')
  //   ReactDOM.render(<App />, div)
  //   ReactDOM.unmountComponentAtNode(div)
  // })

  describe('/ path', () => {
    const mountedApp = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
          <Route component={App} />
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
      mountedApp.unmount()
    })
  })

  // describe('/user path', () => {
  //   const mountedApp = mount(
  //     <MemoryRouter initialEntries={[ '/user' ]}>
  //         <App />
  //     </MemoryRouter>
  //   )

  //   it('always renders a redirect to /', () => {
  //     expect(mountedApp.find(App).props().location.pathname).toEqual("/")
  //     mountedApp.unmount()
  //   })
  // })

  // describe('/user/:googleId/profile path', () => {
  //   const mountedApp = mount(
  //     <MemoryRouter initialEntries={[ "/sign-up" ]}>
  //         <Route component={App} />
  //     </MemoryRouter>
  //   )

  //   it('should render a div', () => {
  //     expect(mountedApp.find('div').length).toBeGreaterThan(0)
  //   })

  //   it('should render a Nav', () => {
  //     expect(mountedApp.find(Nav).length).toBeGreaterThan(0)
  //   })

  //   // it('should render a Profile', () => {
  //   //   expect(mountedApp.find(SignUpPage).length).toBeGreaterThan(0)
  //   //   mountedApp.unmount()
  //   // })
  // })
})


