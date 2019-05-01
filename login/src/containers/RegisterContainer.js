import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as UserActions from '../actions/user'
import Register from '../components/RegisterForm'

const mapStateToProps = (state) => {
  return {
    isRegistering: state.isRegistering,
    isAuthenticated: state.isAuthenticated,
    statusText: state.statusText
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)