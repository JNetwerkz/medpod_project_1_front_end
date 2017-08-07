import React, { Component } from 'react'
import { Container, Image, Header, Segment, Divider } from 'semantic-ui-react'


import axios from 'axios'

import { auth } from 'firebase-settings'
import ErrorMessage from 'partial/error'

// import components
import LoginForm from './components/login-form'

class AuthMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: null
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

    const fromState = this.props.location.state

    const { errors } = this.state

    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        user.getIdToken(true).then((token) => {
          window.location = (fromState) ? fromState.from.pathname : '/patient'
        })
      })
      .catch((err) => {
        return err.message
        ? this.setState({ errors: ['There is something wrong with your login. Please check your email or password.'] })
        : ''
      })
  }

  handleSignOut () {
    auth.signOut().then(() => {
      window.location = '/login'
    })
  }

  render () {
    console.log('loginmain props', this)
    const { errors } = this.state
    return (
      <div className='container__login'>
        <Image src='https://s3-ap-southeast-1.amazonaws.com/medipod.1/Medipod+Logo.jpg' size='small' verticalAlign='middle' /> <span>Customer Management System</span>
        <Divider hidden />
        <ErrorMessage errors={errors} />
        <section className='login__form'>
          <Segment>
            <Header size='huge' textAlign='center'>
              Welcome Back!
            </Header>
            <LoginForm className='flex--grow2'
              email={this.state.email}
              password={this.state.password}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit} />
          </Segment>
        </section>
      </div>
    )
  }

}

export default AuthMain
