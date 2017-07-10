import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

class NavMain extends Component {
  render () {
    console.log(this.props)
    return (
      <Container fluid>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/patient'>Patients</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/transaction'>Transactions</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/doctor'>Doctor</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/login'>Login</NavLink>
        </li>
      </Container>
    )
  }
}

export default NavMain
