import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import * as $ from 'jquery'
import axios from 'axios'

import { Form, Button } from 'semantic-ui-react'

import AuthHeader from 'auth-header'

class PatientNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientNewForm: [],
      redirectToShow: false,
      redirectTo: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {
    this.setState({
      patientNewForm: $('#patient_new-form').serializeArray()
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = this.state.patientNewForm

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      data: formData,
      headers: AuthHeader()
    })
    .then((res) => {
      console.log('new patient data', res.data)
      this.setState({
        redirectToShow: true,
        redirectTo: res.data._id
      })
    })
    .catch((err) => console.error(err))
  }

  render () {
    if (this.state.redirectToShow) return <Redirect to={this.state.redirectTo} />
    return (
      <Form id='patient_new-form' onChange={(event) => this.handleChange(event)} onSubmit={(event) => this.handleSubmit(event)}>
        <h2>Enter New Patient Information</h2>
        <Form.Field>
          <label>First Name</label>
          <input type='text' name='first name'></input>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input type='text' name='last name'></input>
        </Form.Field>
        <Form.Field>
          <label>IC / Passport</label>
          <input type='text' name='ic / passport'></input>
        </Form.Field>
        <Form.Field>
          <label>Gender</label>
          <input type='text' name='gender'></input>
        </Form.Field>
        <Form.Field>
          <label>Referral Agent</label>
          <input type='text' name='referral agent'></input>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default PatientNew
