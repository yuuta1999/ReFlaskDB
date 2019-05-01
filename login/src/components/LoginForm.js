/* eslint-disable camelcase */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider } from 'styled-components'
import { reduxForm } from 'redux-form'

import { history } from '../utils/misc'
import { validate } from '../utils/validate'
import { FormLogin, AvatarLogin, MainLogin, PaperLogin, SubmitLogin } from './styles/Login'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      disabled: false,
      loaded: false
    }
  }

  isDisabled () {
    let isUsernameValid = false
    let isPasswordValid = false

    if (this.state.username === '' && this.state.password === '') {
      this.setState({
        disabled: true
      })
    }
  }

  _handleChangeValue (e, type) {
    const value = e.target.value
    const next_state = {}
    next_state[type] = value
    this.setState(next_state, () => { this.isDisabled() })
  }

  _handleKeyPress (e) {
    if (e.key === 'Enter') {
      if (!this.state.disabled) {
        this.loginUser(e)
      }
    }
  }

  loginUser (e) {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  componentWillMount () {
    this.checkUser()
  }

  componentWillReceiveProps (nextProps) {
    this.checkUser(nextProps)
  }

  checkUser (props = this.props) {
    if (props.isAuthenticated) {
      history.push('/')
    } else {
      const token = localStorage.getItem('token')
      
      if (token) {
        const config = {
          method: 'post',
          url: 'http://localhost:5000/api/token',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          data: JSON.stringify({ token })
        }
        axios(config)
          .then(res => {
            if (res.status === 200) {
              this.props.loginSuccess(token)
              history.push('/')
            } else {
              this.setState({
                loaded: true
              })
            }
          })
      } else {
        this.setState({
          loaded: true
        })
      }
    }
  }

  render () {
    const theme = {
      spacing: 8
    }
    return (
      <ThemeProvider theme={theme}>
        <MainLogin onKeyPress={(e) => this._handleKeyPress(e)}>
          <CssBaseline />
          <PaperLogin>
            <AvatarLogin>
              <LockOutlinedIcon />
            </AvatarLogin>
            <Typography component='h1' variant='h5'>Login</Typography>
            <FormLogin>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input id='username' name='username' autoComplete='username' onChange={(e) => this._handleChangeValue(e, 'username')} autoFocus/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" onChange={(e) => this._handleChangeValue(e, 'password')} autoComplete="current-password" />
              </FormControl>
              <center>
                <SubmitLogin type="submit" variant="contained" disabled={this.state.disabled} onClick={(e) => this.loginUser(e)}>Login</SubmitLogin>
              </center>
            </FormLogin>
          </PaperLogin>
        </MainLogin>
      </ThemeProvider>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
