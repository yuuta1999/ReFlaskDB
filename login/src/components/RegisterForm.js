/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider } from 'styled-components'
import { Field, reduxForm } from 'redux-form'

import { history } from '../utils/misc'
import { asyncValidate, validate } from '../utils/validate'
import { MainRegister, PaperRegister, AvatarRegister, FormRegister, SubmitRegister } from './styles/Register'

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl margin='normal'fullWidth>
    <TextField id={label} label={label} error={touched && invalid} helperText={touched && error} {...input} {...custom}/>
  </FormControl>
)

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        username: null,
        password: null,
        lastname: null,
        firstname: null,
        email: null,
        phone: null
      },
      confirm_password: null,
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
    const nextState = this.state.data
    nextState[type] = value
    this.setState({ data: nextState }, () => { this.isDisabled() })
  }

  _handleKeyPress (e) {
    if (e.key === 'Enter') {
      if (!this.state.disabled) {
        this.registerUser(e)
      }
    }
  }

  registerUser (e) {
    e.preventDefault()
    console.log(this.state.data)
    this.props.register(this.state.data)
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
        <MainRegister onKeyPress={(e) => this._handleKeyPress(e)}>
          <CssBaseline />
          <PaperRegister>
            <AvatarRegister>
              <LockOutlinedIcon />
            </AvatarRegister>
            <Typography component='h1' variant='h5'>Register</Typography>
            <FormRegister>
              <Grid container spacing={theme.spacing}>
                <Grid item xs={12} sm={6}>
                  <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='firstname'>First name</InputLabel>
                    <Input id='firstname' name='firsname' onChange={(e) => this._handleChangeValue(e, 'firstname')} autoFocus/>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl margin='normal' required fullWidth>
                    <InputLabel htmlFor='lastname'>Lastname</InputLabel>
                    <Input id='lastname' name='lastname' onChange={(e) => this._handleChangeValue(e, 'lastname')} autoFocus/>
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input id='username' name='username' autoComplete='username' onChange={(e) => this._handleChangeValue(e, 'username')} autoFocus/>
              </FormControl>
              <Field label="Email" name="email" component={renderTextField} onChange={(e) => this._handleChangeValue(e, 'email')}/>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" onChange={(e) => this._handleChangeValue(e, 'password')} autoComplete="current-password" />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                <Input name="confirm_password" type="password" id="confirm_password" onChange={(e) => this._handleChangeValue(e, 'confirm_password')} />
              </FormControl>
              <center>
                <SubmitRegister type="submit" variant="contained" disabled={this.state.disabled} onClick={(e) => this.registerUser(e)}>Register</SubmitRegister>
              </center>
            </FormRegister>
          </PaperRegister>
        </MainRegister>
      </ThemeProvider>
    )
  }
}

export default reduxForm({
  form: 'register',
  validate,
  asyncValidate
})(Register)
