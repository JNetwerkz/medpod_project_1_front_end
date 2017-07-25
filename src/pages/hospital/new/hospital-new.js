import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import { Form, Button, Header, Input, Select, Container } from 'semantic-ui-react'

export default class HospitalNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',

      // form input fields
      'name': '',
      'address': ''
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
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital`,
      data: formData
    })
    .then((res) => {
      console.log('new hospital data', res.data)
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
      <Container fluid>
        <Header as='h3' block inverted>
          Input New Hospital Information
        </Header>
        <Form id='hospital_new-form' onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Input label='Name' placeholder='Name' name='name' onChange={this.handleInputChange} />
            <Form.Input label='Address' placeholder='Address' name='address' onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    )
  }
}
