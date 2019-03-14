import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Nav from './Nav'
import queryString from 'query-string'
import Articles from '../containers/Articles'

const App = () => (
  <Router>
    <div>
      <Switch>
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
        <Route path="/" render={ () => {
          return (
            <div>
              <Nav />
              <Articles />
            </div>
          )
        }} />
      </Switch>
    </div>
  </Router>
)

export default App
