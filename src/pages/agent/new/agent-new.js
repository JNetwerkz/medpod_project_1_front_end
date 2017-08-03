import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import { Form, Container, Header } from 'semantic-ui-react'
import { genderOption } from 'custom-function'
import ErrorMessage from 'partial/error'

export default class AgentNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',

      // form input fields
      'first name': '',
      'last name': '',
      'gender': '',
      errors: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    console.log(name, value)

    this.setState({
      [name]: value
    })
  }

  handleSelectChange (event, value, name) {
    console.log(name, value)
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = this.state

    console.log(formData)

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent`,
      data: formData
    })
    .then((res) => {
      console.log('new agent data', res.data)
      const { errors } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        redirectToShow: true,
        redirectTo: res.data._id
      })
    })
    .catch((err) => console.error(err))
  }

  render () {
    if (this.state.redirectToShow) return <Redirect to={this.state.redirectTo} />
    const { errors } = this.state

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Header as='h1'>
          NEW AGENT
        </Header>
        <Form id='agent_new-form' onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Input label='First name' placeholder='First name' name='first name' onChange={this.handleInputChange} />
            <Form.Input label='Last name' placeholder='Last name' name='last name' onChange={this.handleInputChange} />
            <Form.Select label='Gender' options={genderOption} placeholder='Gender' onChange={(e, {value}) => this.handleSelectChange(e, value, 'gender')} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    )
  }
}
