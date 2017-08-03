import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import { Form, Header, Container, Confirm } from 'semantic-ui-react'

import ErrorMessage from 'partial/error'

export default class AddonNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',

      // form input fields
      'name': '',
      errors: null,
      confirmOpen: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOpenCloseConfirm = this.handleOpenCloseConfirm.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
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

  handleSubmit () {
    // event.preventDefault()
    const formData = this.state

    console.log('at handlesubmit')

    if (!formData.name) return this.setState({ errors: ['Please specify NAME for Add-on'] })

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/addon`,
      data: formData
    })
    .then((res) => {
      console.log('new addon data', res.data)
      const {
        errors
      } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        redirectToShow: true,
        redirectTo: res.data._id
      })
    })
    .catch((err) => console.error(err))
  }

  handleConfirm () {
    this.setState({ confirmOpen: false })

    this.handleSubmit()
  }

  handleOpenCloseConfirm () {
    const { confirmOpen } = this.state
    return this.setState({ confirmOpen: !confirmOpen })
  }

  render () {
    if (this.state.redirectToShow) return <Redirect to={this.state.redirectTo} />
    const {
      errors,
      confirmOpen,
      name
    } = this.state

    const {
      handleSubmit,
      handleInputChange,
      handleOpenCloseConfirm,
      handleConfirm
    } = this

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Header as='h1'>
          New Add-on
        </Header>
        <Form id='addon_new-form'
          // onSubmit={(event) => handleSubmit(event)}
          ref={(input) => {
            console.log('input', input)
            this.addonFormRef = input
          }}
          >
          <Form.Group widths='equal'>
            <Form.Input label='Name' placeholder='Name' name='name' onChange={handleInputChange} />
          </Form.Group>
          <Form.Button
            type='button'
            onClick={handleOpenCloseConfirm}>
            Submit
          </Form.Button>
          <Confirm
            open={confirmOpen}
            header='Attention! Add-on that is created cannot be deleted / edited'
            content={`Please ensure your entry Name: ${name || '<empty>'} is correct!`}
            onCancel={handleOpenCloseConfirm}
            onConfirm={handleConfirm}
          />
        </Form>
      </Container>
    )
  }
}
