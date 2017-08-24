import React, { Component } from 'react'
import { Form, Container, Image, Header, Segment, Divider, Menu, Input, Button } from 'semantic-ui-react'

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
      errors: null,
      loading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleChange (event, {value}) {
    console.log(event, value, event.target.name)
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ loading: true })

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
        ? this.setState({ errors: ['There is something wrong with your login. Please check your email or password.'], loading: false })
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
    const { errors, password, email, loading } = this.state
    const { handleChange, handleSubmit } = this
    return (
      <div className='flex flex--column'>
        <ErrorMessage errors={errors} />
        <section className='flex flex--rowreverse'>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Field>
                {/* <label>&nbsp;</label> */}
                <label>Email</label>
                <Form.Input
                  value={email}
                  name='email'
                  onChange={handleChange}
                  transparent
                  type='email'
                  placeholder='medipod@medipod.co' />
              </Form.Field>
              <Form.Field>
                {/* <label>&nbsp;</label> */}
                <label>Password</label>
                <Form.Input
                  value={password}
                  name='password'
                  onChange={handleChange}
                  transparent
                  type='password'
                  placeholder='******' />
              </Form.Field>
              <Form.Field>
                <Form.Button loading={loading} primary>Sign In</Form.Button>
              </Form.Field>
            </Form.Group>
          </Form>
        </section>
        <Divider section hidden />
        <section className='flex flex--row flex--jc-center flex--grow'>
          <div>
            <Image src='https://s3-ap-southeast-1.amazonaws.com/medipod.1/Medipod+Logo.jpg' size='small' verticalAlign='middle' />
            {/* <h1 className='medipod'>
            Medipod
          </h1> */}
          <Header as='h1'>
            Customer Management System
          </Header>

          </div>
        </section>
      </div>
      // <div className='container__login'>
      //   <section className='flex flex--row flex--jc-center'>
      //     <div>
      //     </div>
      //     <span>CMS</span>
      //   </section>
      //   <Divider hidden />
      //   <ErrorMessage errors={errors} />
      //   <section className='login__form'>
      //     <Segment>
      //       <Header size='huge' textAlign='center'>
      //         Welcome Back!
      //       </Header>
      //       <LoginForm className='flex--grow2'
      //         email={this.state.email}
      //         password={this.state.password}
      //         handleChange={this.handleChange}
      //         handleSubmit={this.handleSubmit} />
      //     </Segment>
      //   </section>
      // </div>
    )
  }

}

export default AuthMain
