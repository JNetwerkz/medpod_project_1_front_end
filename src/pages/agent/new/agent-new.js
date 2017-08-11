import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import { Form, Container, Header, Button, Divider } from 'semantic-ui-react'
import { genderOption } from 'custom-function'
import ErrorMessage from 'partial/error'
import S3Subheader from 'partial/_subheaders'

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
      'ic / passport': '',
      personalPhoneNumber: '',
      personalEmail: '',
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
    const {
      'first name': firstName,
      'last name': lastName,
      'ic / passport': icPassport,
      gender,
      personalPhoneNumber,
      personalEmail,
      errors
    } = this.state

    const {
      handleInputChange,
      handleSubmit,
      handleSelectChange
    } = this

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Form id='agent_new-form' onSubmit={(event) => handleSubmit(event)}>
        <Header as='h1'>
          New Agent
          <Button floated='right'>Submit</Button>
        </Header>
          <S3Subheader text='Personal Information' />
          <Form.Group widths='equal'>
            <Form.Input value={firstName} label='First name' placeholder='First name' name='first name' onChange={handleInputChange} />
            <Form.Input value={lastName} label='Last name' placeholder='Last name' name='last name' onChange={handleInputChange} />
            <Form.Input value={icPassport} label='IC / Passport' placeholder='IC / Passport' name='ic / passport' onChange={handleInputChange} />
            <Form.Select value={gender} label='Gender' options={genderOption} placeholder='Gender' onChange={(e, {value}) => handleSelectChange(e, value, 'gender')} />
          </Form.Group>
          <Divider hidden />
          <Form.Group widths='equal'>
            <Form.Input value={personalPhoneNumber} label='Contact Number' placeholder='8125 XXXX' name='personalPhoneNumber' onChange={handleInputChange} />
            <Form.Input value={personalEmail} label='Email' placeholder='agent@mail.com' name='personalEmail' onChange={handleInputChange} />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}
