import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Sidebar, Menu } from 'semantic-ui-react'

export default class NavMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: ''
    }
    this.handleNavItemClick = this.handleNavItemClick.bind(this)
  }

  handleNavItemClick (e, { name }) {
    const toLink = `/${name}`
    this.setState({ activeItem: toLink })
  }

  componentDidMount () {
    console.log(this.props)
    this.setState({ activeItem: this.props.pathname })
  }

  render () {
    const { activeItem } = this.state
    return (
        <div>
          <Menu.Item as={Link} to='/patient' name='patient' active={activeItem === '/patient'} onClick={this.handleNavItemClick}>
              Patients
            </Menu.Item>
          <Menu.Item as={Link} to='/transaction' name='transaction' active={activeItem === '/transaction'} onClick={this.handleNavItemClick}>
              Transactions
            </Menu.Item>
          <Menu.Item as={Link} to='/doctor' name='doctor' active={activeItem === '/doctor'} onClick={this.handleNavItemClick}>
              Doctors
            </Menu.Item>
          <Menu.Item as={Link} to='/hospital' name='hospital' active={activeItem === '/hospital'} onClick={this.handleNavItemClick}>
              Hospitals
            </Menu.Item>
          <Menu.Item as={Link} to='/addon' name='addon' active={activeItem === '/addon'} onClick={this.handleNavItemClick}>
              Addons
            </Menu.Item>
          <Menu.Item as={Link} to='/agent' name='agent' active={activeItem === '/agent'} onClick={this.handleNavItemClick}>
              Agents
            </Menu.Item>
          <Menu.Item as={Link} to='/invoice' name='invoice' active={activeItem === '/invoice'} onClick={this.handleNavItemClick}>
              Invoices
            </Menu.Item>
          <Menu.Item as={Link} to='/login' name='login' active={activeItem === '/login'} onClick={this.handleNavItemClick}>
              Login
            </Menu.Item>
        </div>
    )
  }
}

/* <Container fluid>
  <li>
   to='/patient'>Patients</NavLink> </li>
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
</Container> */
