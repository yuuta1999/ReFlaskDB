/* eslint-disable no-unused-vars */
import React from 'react'
import { Switch, Route, Router, withRouter } from 'react-router'
import { createGlobalStyle } from 'styled-components'

import Main from './pages/Main'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import ErrorView from './pages/ErrorView'
import { history } from './utils/misc' // should be used for entire project.
import Nav from './components/Nav';

const GlobalStyle = createGlobalStyle`
  @font-face {
    /* 
      if want to use other font, embedded in HMTL
      and then change the code below.
    */
    font-family: 'Playfair Display';
  }
  body {
    background-color: #eeeeee;
  }
`

class Root extends React.Component {
  render () {
    return (
      <Main>
        <Router history={history}>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Router path='*' component={ErrorView}/>
          </Switch>
        </Router>
      </Main>
    )
  }
}

export default Root
