import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import HomeView from '../components/HomeView'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    token: state.user.token,
    username: state.user.username,
    isAuthenticated: state.user.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
