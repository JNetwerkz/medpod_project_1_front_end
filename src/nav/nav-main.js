import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu, Divider } from 'semantic-ui-react'

import { userType, userEmail, auth, isAuthenticated } from 'firebase-settings'

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
    this.setState({ activeItem: this.props.pathname })
  }

  render () {
    if (!isAuthenticated()) return null
    const currentUserType = window.localStorage.getItem(userType)
    const currentUserEmail = window.localStorage.getItem(userEmail)
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
            {currentUserEmail}<br /><br />
            {currentUserType}
          </Menu.Header>
        </Menu.Item>
        <Menu.Item as='a' onClick={handleSignOut}>Log out</Menu.Item>
      </Menu>
    )
  }
}
