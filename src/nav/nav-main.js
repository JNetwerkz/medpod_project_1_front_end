import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu, Divider } from 'semantic-ui-react'

import { userType, userEmail, userName, auth, isAuthenticated } from 'firebase-settings'

export default class NavMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: ''
    }
    this.handleNavItemClick = this.handleNavItemClick.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut () {
    auth.signOut().then(() => {
      window.location = '/login'
    })
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
    if (!isAuthenticated()) return null
    const currentUserType = window.localStorage.getItem(userType)
    const currentUserEmail = window.localStorage.getItem(userEmail)
    const currentUserName = window.localStorage.getItem(userName) || ''
    console.log('currentusertype', currentUserType)
    const { activeItem } = this.state
    const { handleSignOut, handleNavItemClick } = this
    return (
      <Menu stackable inverted secondary vertical size='large' color='black' id='app__nav'>
        <Menu.Item as={Link} to='/transaction' name='transaction' active={activeItem === '/transaction'} onClick={handleNavItemClick}>
          Transactions
        </Menu.Item>
        <Menu.Item as={Link} to='/patient' name='patient' active={activeItem === '/patient'} onClick={handleNavItemClick}>
          Patients
        </Menu.Item>
        <Menu.Item as={Link} to='/agent' name='agent' active={activeItem === '/agent'} onClick={handleNavItemClick}>
          Agents
        </Menu.Item>
        <Divider section />
        <Menu.Item as={Link} to='/hospital' name='hospital' active={activeItem === '/hospital'} onClick={handleNavItemClick}>
          Hospitals
        </Menu.Item>
        <Menu.Item as={Link} to='/doctor' name='doctor' active={activeItem === '/doctor'} onClick={handleNavItemClick}>
          Doctors
        </Menu.Item>
        <Menu.Item as={Link} to='/addon' name='addon' active={activeItem === '/addon'} onClick={handleNavItemClick}>
          Addons
        </Menu.Item>
        <Divider section />
        <Menu.Item
          as={Link} to='/invoice' name='invoice' active={activeItem === '/invoice'} onClick={handleNavItemClick}>
          Invoices
        </Menu.Item>
        <Menu.Item
          as={Link} to='/user' name='user' active={activeItem === '/user'} onClick={handleNavItemClick}>
          Users
        </Menu.Item>
        <Divider section />
        <Menu.Item>
          <Menu.Header>
            {/* {currentUserName || ''}<br /><br /> */}
            {currentUserEmail}<br /><br />
            {currentUserType}
          </Menu.Header>
          {/* <Menu.Header>Access Level: {currentUserType}</Menu.Header> */}
        </Menu.Item>
        <Menu.Item as='a' onClick={handleSignOut}>Log out</Menu.Item>
      </Menu>
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
