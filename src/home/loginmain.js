import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

// import components
import LoginForm from './components/loginform'

class LoginMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }


  handleChange (field, event) {
    console.log('making changes to form input field')

    const changes = {}
    switch(field) {
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
    console.log('handleSubmit event', event.target)
    event.preventDefault()
  }

  render () {
    return (
      <Container fluid>
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
      </Container>
    )
  }

}

export default LoginMain
