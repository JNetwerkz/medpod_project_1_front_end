import React, { Component } from 'react'
import { Form, Image, Header, Segment, Divider, Button } from 'semantic-ui-react'

import { auth } from 'firebase-settings'
import ErrorMessage from 'partial/error'

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
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ loading: true })

    const fromState = this.props.location.state

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
    const { errors, password, email, loading } = this.state
    const { handleChange, handleSubmit } = this
    return (
      <div id='app__auth' className='flex flex--column flex--jc-center flex--align--center'>
        <ErrorMessage errors={errors} />
        <Segment raised padded='very' color='olive'>
          <div className='flex flex--column flex--jc-center flex--align--center'>
            <Image src='https://s3-ap-southeast-1.amazonaws.com/medipod.1/Medipod+Logo.jpg' size='small' verticalAlign='middle' />
            <Header as='h4' dividing textAlign='justified'>
            Customer Management System
          </Header>
            <Form onSubmit={handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input
                  label={<label>E M A I L</label>}
                  value={email}
                  name='email'
                  onChange={handleChange}
                  transparent
                  type='email'
                  placeholder='medipod@medipod.co' />
                <Form.Input
                  label={<label>P A S S W O R D</label>}
                  value={password}
                  name='password'
                  onChange={handleChange}
                  transparent
                  type='password'
                  placeholder='* * * * * * * *' />
              </Form.Group>
              <Divider hidden />
              <Button color='olive' fluid loading={loading}>Sign In</Button>
            </Form>
          </div>
        </Segment>
      </div>
    )
  }

}

export default AuthMain
