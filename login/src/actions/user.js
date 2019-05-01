import axios from 'axios'
import { history } from '../utils/misc'

import { Login, Logout, Register } from '../constants/user'
import { parseJSON } from '../utils/misc'

export const loginSuccess = (token) => {
  localStorage.setItem('token', token)
  return {
    type: Login.SUCCESS,
    payload: { token }
  }
}

export const loginFailure = (error) => {
  localStorage.removeItem('token')
  return {
    type: Login.FAILURE,
    payload: {
      status: error.status,
      statusText: error.statusText
    }
  }
}

export const loginRequest = () => {
  return {
    type: Login.REQUEST
  }
}

export const login = (username, password) => {
  const request = {
    method: 'post',
    url: 'http://localhost:5000/api/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username: username,
      password: password
    }
  }

  return dispatch => {
    dispatch(loginRequest())
    return axios(request)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(loginSuccess(response.token))
          history.push('/')
        } catch (e) {
          dispatch(loginFailure({
            response: {
              status: 403,
              statusText: 'Invalid Token'
            }
          }))
        }
      }).catch(error => {
        dispatch(loginFailure(error))
      })
  }
}

export const logoutRequest = () => {
  localStorage.removeItem('token')
  return {
    type: Logout.REQUEST
  }
}

export const logoutAndRedirect = () => {
  return dispatch => {
    dispatch(logoutRequest())
    history.push('/')
  }
}

export const registerRequest = () => {
  return {
    type: Register.REQUEST
  }
}

export const registerSuccess = () => {
  return {
    type: Register.SUCCESS
  }
}

export const registerFailure = (error) => {
  return {
    type: Register.FAILURE,
    payload: {
      status: error.status,
      statusText: error.statusText
    }
  }
}

export const register = (load) => {
  const config = {
    method: 'post',
    url: 'http://localhost:5000/api/register',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username: load['username'],
      password: load['password'],
      email: load['email'],
      phone: load['phone'],
      lastname: load['lastname'],
      firstname: load['firstname']
    }
  }
  return dispatch => {
    dispatch(registerRequest())
    return axios(config)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(registerSuccess())
          history.push('/login')
        } catch (e) {
          dispatch(registerFailure({
            response: {
              status: 202,
              statusText: 'Username existed!'
            }
          }))
        }
      })
      .catch(error => {
        dispatch(registerFailure(error))
      })
  }
}