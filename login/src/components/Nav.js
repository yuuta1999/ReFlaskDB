/* eslint-disable no-unused-vars */
import React from 'react'
import { history } from '../utils/misc'
import styled, { css } from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

/**
 * Start Styled-components configuration
 */
const NavBtn = styled(Button)`
  && {
    ${props => props.isAuthenticated ? css`
      background-color: black ;
      color: white ;
    ` : css`
      background: transparent;
      color: black;
    `}
  }
`
const IconBtn = styled(IconButton)`
  margin-left: -12;
  margin-right: 20;
`
const Wrapper = styled.div`
  flex-grow: 1;
`

const Typo = styled(Typography)`
  flex-grow: 1;
`

const StyledAppBar = styled(AppBar)`
  &.my-class {
    background-color: transparent;
    box-shadow: none;
  }
`
/**
 * End Styled-components configuration
 */
class Nav extends React.Component {
  dispatchNewRoute (route) {
    history.push(route)
  }

  logout (e) {
    e.preventDefault()
    this.props.logoutAndRedirect()
  }

  render () {
    console.log(this.props)
    return (
      <Wrapper>
        <StyledAppBar className={`my-class`} position="static">
          <Toolbar>
            <IconBtn>
              <MenuIcon/>
            </IconBtn>
            <Typo>ReflaskDB</Typo>
            {
              !this.props.isAuthenticated
                ? <>
                  <NavBtn onClick={() => this.dispatchNewRoute('/register')}>Register</NavBtn>
                  <NavBtn onClick={() => this.dispatchNewRoute('/login')}>Login</NavBtn>
                </> : <>
                  <NavBtn onClick={(e) => this.logout(e)} >Logout</NavBtn>
                </>
            }
          </Toolbar>
        </StyledAppBar>
      </Wrapper>
    )
  }
}

export default Nav
