import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import { Form, Header, Container, Button, Divider } from 'semantic-ui-react'
import ErrorMessage from 'partial/error'
import S3Subheader from 'partial/_subheaders'

export default class HospitalNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',

      // form input fields
      name: '',
      nameAbbreviation: '',
      associationAddress_street: '',
      associationAddress_unit: '',
      associationAddress_postalcode: '',
      associationAddress_country: '',
      associationPhoneNumber: '',
      associationEmail: '',
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
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital`,
      data: formData
    })
    .then((res) => {
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
      name,
      nameAbbreviation,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail,
      errors
     } = this.state

    const {
       handleSubmit,
       handleInputChange
     } = this

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Form id='hospital_new-form' onSubmit={(event) => handleSubmit(event)}>
          <Header as='h1'>
          New Hospital
          <Button floated='right'>Submit</Button>
          </Header>
          <S3Subheader text='Basic Information' />
          <Form.Group widths='equal'>
            <Form.Input required value={name} label='Name' placeholder='Mount Elizabeth Orchard' name='name' onChange={handleInputChange} />
            <Form.Input value={nameAbbreviation} label='Name Abbreviation' placeholder='MEO' name='nameAbbreviation' onChange={handleInputChange} />
            <Form.Input value={associationPhoneNumber} label='Contact Number' placeholder='8125 XXXX' name='associationPhoneNumber' onChange={handleInputChange} />
            <Form.Input value={associationEmail} label='Email' placeholder='accounts@mounte.com' name='associationEmail' onChange={handleInputChange} />
          </Form.Group>
          <S3Subheader text='Address' />
          <Form.Group widths='equal'>
              <Form.Input required value={associationAddress_unit} label='Unit Number' name='associationAddress_unit' onChange={handleInputChange} />
              <Form.Input required value={associationAddress_street} label='Block & Street' name='associationAddress_street' onChange={handleInputChange} />
              <Form.Input required value={associationAddress_postalcode} label='Postal Code' name='associationAddress_postalcode' onChange={handleInputChange} />
              <Form.Input required label='Country' placeholder='Singapore' name='associationAddress_country'
                value={associationAddress_country} onChange={handleInputChange} />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}
