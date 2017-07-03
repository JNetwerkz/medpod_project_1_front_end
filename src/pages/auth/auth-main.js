import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import axios from 'axios'

import { auth } from '../../firebase'

// import components
import LoginForm from './components/login-form'

class AuthMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleChange (field, event) {
    console.log('making changes to form input field')

    const changes = {}
    switch (field) {
      case 'email':
        changes.email = event.target.value
        break
      case 'password':
        changes.password = event.target.value
        break
      default:
        console.log('error')
        break
    }
    console.log('changes is', changes)
    this.setState(changes)
  }

  handleSubmit (event) {
    event.preventDefault()

    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        user.getIdToken(true).then((token) => {
          console.log('token', token)
          axios({
            url: 'http://localhost:8888/',
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
        })
        // window.location = '/'
      })
      .catch((err) => {
        console.log('sign in error', err)
      })
  }

  handleSignOut () {
    auth.signOut().then(() => {
      window.location = '/login'
    })
  }

  render () {
    console.log('loginmain props', this.props)
    return (
      <Container fluid>

        <LoginForm
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />

        <button onClick={this.handleSignOut}>Sign Out</button>
      </Container>
    )
  }

}

export default AuthMain
