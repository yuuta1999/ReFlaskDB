import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userAction from '../actions/user'
import Nav from '../components/Nav'

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    username: state.user.username,
    isAuthenticated: state.user.isAuthenticated,
    loadIfNeed: state.user.loadIfNeed
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userAction, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
