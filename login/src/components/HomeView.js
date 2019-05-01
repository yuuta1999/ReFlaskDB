import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

import { history } from '../utils/misc'

const HomeWrapper = styled.div`
  font-family: 'Playfair Display', sans-serif;
`

const HomeHeader = styled.h2`
  font-size: 80px;
  text-align: center;
`
const HomeContainer = styled.p`
  font-size: 32px;
  text-align: center;
  padding-top: 10;
`

class HomeView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false
    }
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
      console.log('This is token: ' + token)

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
        console.log('This is data token: ' + config.data)
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
    return (
      <HomeWrapper>
        <HomeHeader>Homepage</HomeHeader>
        {
          !this.props.isAuthenticated
            ? (
              <HomeContainer>
                Welcome to ReFlaskDB
              </HomeContainer>
            ) : (
              <HomeContainer>
                Hi {this.props.username}
              </HomeContainer>
            )
        }
      </HomeWrapper>
    )
  }
}

export default HomeView
