import jwtDecode from 'jwt-decode'

import { Login, Logout, Register } from '../constants/user'
import { createReducer } from '../utils/misc'

const initialState = {
  token: null,
  username: null,
  isAuthenticating: null,
  isAuthenticated: null,
  statusText: null,
  loadIfNeed: false,
  isRegistering: null,
  registerStatusText: null
}

export default createReducer(initialState, {
  [Login.REQUEST]: (state) => Object.assign({}, state, {
    isAuthenticated: false,
    isAuthenticating: true
  }),
  [Login.FAILURE]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
  }),
  [Login.SUCCESS]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: true,
    isAuthenticating: false,
    token: payload,
    username: jwtDecode(payload.token).sub,
    statusText: 'You have successfully logged in.'
  }),
  [Logout.REQUEST]: (state) => Object.assign({}, state, {
    isAuthenticated: false,
    token: null,
    username: null,
    loadIfNeed: true
  }),
  [Register.REQUEST]: (state) => Object.assign({}, state, {
    isRegistering: true
  }),
  [Register.SUCCESS]: (state) => Object.assign({}, state, {
    isRegistering: false,
    loadIfNeed: true,
    registerStatusText: 'You have successfully registered. Please log in.'
  }),
  [Register.FAILURE]: (state, payload) => Object.assign({}, {
    isRegistering: false,
    registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`
  })
})
