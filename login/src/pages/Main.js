import React from 'react'

import NavContainer from '../containers/NavContainer'

class Main extends React.Component {
  render () {
    return (
      <div>
        <NavContainer/>
        {this.props.children}
      </div>
    )
  }
}

export default Main
