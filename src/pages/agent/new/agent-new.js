import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import * as $ from 'jquery'

import { Form } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Others', value: 'others' }
]

export default class AgentNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',

      // form input fields
      'first name': '',
      'last name': '',
      'gender': ''
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

  // handleChange () {
  //   console.log($('#doctor_new-form'))
  //   this.setState({
  //     doctorNewForm: $('#doctor_new-form').serializeArray()
  //   })
  // }

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
      <div>
        <h2>New</h2>
        <Form id='agent_new-form' onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Input label='First name' placeholder='First name' name='first name' onChange={this.handleInputChange} />
            <Form.Input label='Last name' placeholder='Last name' name='last name' onChange={this.handleInputChange} />
            <Form.Select label='Gender' options={options} placeholder='Gender' onChange={(e, {value}) => this.handleSelectChange(e, value, 'gender')} />
            {/* <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' onChange={(e, {value}, {text}) => this.handleSelectChange(e, value, text)} /> */}
            {/* <Form.Field label='Gender' placeholder='Gender' name='gender' control='select' value={this.state['gender']} onChange={this.handleInputChange}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='others'>Others</option>
            </Form.Field> */}
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}
