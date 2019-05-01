import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

export const MainRegister = styled.main`
    width: auto;
    display: block;
    margin-left: ${props => props.theme.spacing * 3}px;
    margin-right: ${props => props.theme.spacing * 3}px;

    @media (min-width: 448px) {
      width: 400px;
      height: 1080px;
      margin-left: auto;
      margin-right: auto;
    };
`

export const PaperRegister = styled(Paper)`
  && {
    margin-top: ${props => props.theme.spacing * 8}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
    padding: ${props => props.theme.spacing * 2}px ${props => props.theme.spacing * 3}px ${props => props.theme.spacing * 3}px;
  }
`

export const AvatarRegister = styled(Avatar)`
  && {
    margin: ${props => props.theme.spacing}px;
    background-color: #F44336;
  }
`

export const FormRegister = styled.form`
  width: 100%;
  margin-top: ${props => props.theme.spacing}px;
`

export const SubmitRegister = styled(Button)`
  && {
    margin-top: ${props => props.theme.spacing * 3}px;
    background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
    color: white;
  }
`