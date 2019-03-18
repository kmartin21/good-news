import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Nav from './Nav'
import queryString from 'query-string'
import Profile from './Profile'
import Home from '../containers/Home'
import SignUpPage from '../components/SignUpPage'
import ErrorPage from '../components/ErrorPage'

const App = () => (
  <Router>
    <div>
        {/* <Route exact path="/e/d" render={ ( ) => {
          return (
            <div>
              <Nav />
              <Profile />
            </div>
          )
        }} /> */}
        <Route exact path="/sign-up" render={ () => {
          return (
            <div>
              <Nav />
              <SignUpPage />
            </div>
          )
        }} />
        <Route path='/user' render={ ({ location }) => {
          const parsedQueryString = queryString.parse(location.search)
          
          if (parsedQueryString.googleId) {
            localStorage.setItem("googleId", parsedQueryString.googleId)
          }
          if (parsedQueryString.username) {
            localStorage.setItem("username", parsedQueryString.username)
          }

          return <Redirect to="/" />
        }} />
        <Route exact path="/" render={ () => {
          return (
            <div>
              <Nav />
              <Home />
            </div>
          )
        }} />
         <Route path="*" render={ () => {
          return (
            <div>
              <Nav />
              <ErrorPage errorMessage="404. Looks like you're a bit lost, we couldn't find that page." />
            </div>
          )
        }} />
    </div>
  </Router>
)

export default App
