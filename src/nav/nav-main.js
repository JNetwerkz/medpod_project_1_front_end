import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

export default class NavMain extends Component {
  render () {
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
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/hospital'>Hospital</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/addon'>Addon</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/agent'>Agent</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/invoice'>Invoice</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'red'}} to='/login'>Login</NavLink>
        </li>
      </Container>
    )
  }
}
