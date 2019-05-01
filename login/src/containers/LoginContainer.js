import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as UserAction from '../actions/user'
import LoginForm from '../components/LoginForm'

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.user.isAuthenticating,
    isAuthenticated: state.user.isAuthenticated,
    statusText: state.user.statusText
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(UserAction, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
