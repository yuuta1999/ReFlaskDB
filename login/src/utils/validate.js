/* eslint-disable no-throw-literal */
import axios from 'axios'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values /*, dispatch */) => {
  // Must return a Promise when pass to Redux form
  return sleep(1000).then(() => {
    // simulate server latency
    return axios.get(`http://localhost:5000/api/users/${values.email}`)
      .then(response => response.data)
      .then(data => {
        if (!data.ok) {
          throw { email: data.message }
        }
      })
  })
}

export const validate = values => {
  const errors = {}
  const requiredField = [
    'firstname',
    'lastname',
    'username',
    'password',
    'email'
  ]

  requiredField.forEach(field => {
    // check if field is empty
    if (!values[field]) {
      errors[field] = 'Required'
    }

    // check if email is a valid email
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email'
    }
  })

  return errors
}