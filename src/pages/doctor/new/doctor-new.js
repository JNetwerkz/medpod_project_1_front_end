import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import { Form, Header, Container, Divider, Button, TextArea } from 'semantic-ui-react'
import { genderOption } from 'custom-function'
import HospitalModal from 'partial/modal/hospital-modal'
import ErrorMessage from 'partial/error'
import S3Subheader from 'partial/_subheaders'

export default class DoctorNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',
      // form input fields
      'first name': '',
      'last name': '',
      gender: '',
      hospital: '',
      associationName: '',
      associationAddress_street: '',
      associationAddress_unit: '',
      associationAddress_postalcode: '',
      associationAddress_country: '',
      associationPhoneNumber: '',
      associationEmail: '',
      additionalInfo: '',
      // modal
      hospitalModalOpen: false,
      hospitalSearchResult: [],
      selectedHospital: {},
      searchFocus: false,
      errors: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.hospitalModalMethod = this.hospitalModalMethod.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSelectChange (event, value, name) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = this.state

    if (!formData.hospital) return this.setState({ errors: ['Please select Hospital from search function provided'] })

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor`,
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

  hospitalModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ hospitalModalOpen: true, searchFocus: true })
        break

      case 'close':
        this.setState({ hospitalModalOpen: false })
        break

      case 'change':
        if (event.currentTarget.value.length >= 2) {
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}/hospital/search`, {
            params: { search: event.currentTarget.value }
          })
          .then((res) => {
            this.setState({ hospitalSearchResult: res.data })
          })
          .catch((err) => console.error(err))
        }
        break
      case 'select':
        this.setState({
          selectedHospital: data,
          hospital: data._id
        })

        const eventBubbleName = new Event('input', { bubbles: true })
        this.hospitalNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.hospitalIdRef.dispatchEvent(eventBubbleId)

        break
      default:
        break
    }
  }

  render () {
    if (this.state.redirectToShow) return <Redirect to={this.state.redirectTo} />
    const {
      'first name': firstName,
      'last name': lastName,
      hospital,
      associationName,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail,
      additionalInfo,
      // modal
      hospitalModalOpen,
      hospitalSearchResult,
      selectedHospital,
      searchFocus,
      errors
     } = this.state

    const {
       handleInputChange,
       handleSelectChange,
       hospitalModalMethod,
       handleSubmit
     } = this

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Form id='doctor_new-form' onSubmit={(event) => handleSubmit(event)}>
          <Header as='h1'>
              New Doctor
            <Button floated='right'>Submit</Button>
          </Header>
          <S3Subheader text='Personal Information' />
          <Form.Group widths='equal'>
            <Form.Input required label='First name' placeholder='First name' name='first name'
              value={firstName} onChange={handleInputChange} />

            <Form.Input required label='Last name' placeholder='Last name' name='last name'
              value={lastName} onChange={handleInputChange} />

            <Form.Select required label='Gender' options={genderOption} placeholder='Gender' onChange={(e, {value}) => handleSelectChange(e, value, 'gender')} />
          </Form.Group>

          <S3Subheader text='Department / Institution / Clinic' />
          <Form.Group widths='equal'>
            <Form.Input required label='Name' placeholder='IE: Novena Cancer Centre' name='associationName'
              value={associationName} onChange={handleInputChange} />
            <Form.Input required label='Unit Number' name='associationAddress_unit'
              value={associationAddress_unit} onChange={handleInputChange} />
            <Form.Input required label='Block & Street' name='associationAddress_street'
              value={associationAddress_street} onChange={handleInputChange} />
          </Form.Group>

          <Divider hidden />

          <Form.Group widths='equal'>
            <Form.Input required label='Postal Code' name='associationAddress_postalcode'
              value={associationAddress_postalcode} onChange={handleInputChange} />
            <Form.Input required label='Country' placeholder='Singapore' name='associationAddress_country'
              value={associationAddress_country} onChange={handleInputChange} />
          </Form.Group>

          <S3Subheader text='Contact Infomation' />
          <Form.Group widths='equal'>
            <Form.Input label='Phone Number' name='associationPhoneNumber'
              value={associationPhoneNumber} onChange={handleInputChange} />
            <Form.Input label='Email' name='associationEmail'
              value={associationEmail} onChange={handleInputChange} />
          </Form.Group>

          <S3Subheader text='Hospital' />
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>Name</label>
              <input onClick={() => this.hospitalModalMethod('open')} type='text' name='hospitalName'
                readOnly
                onChange={() => {}}
                ref={(input) => {
                  this.hospitalNameRef = input
                }}
                value={`${selectedHospital.name || ''}`} />
            </Form.Field>

            <Form.Field>
              <label>Hospital ID</label>
              <input readOnly
                type='text'
                name='hospital'
                onChange={() => {}}
                ref={(input) => {
                  this.hospitalIdRef = input
                }}
                value={hospital} />
            </Form.Field>
          </Form.Group>
          <S3Subheader text='Additional Information' />
          <Form.Field control={TextArea}
            value={additionalInfo}
            onChange={handleInputChange}
            name='additionalInfo' />
        </Form>
        <HospitalModal
          hospitalModalOpen={hospitalModalOpen}
          modalMethod={hospitalModalMethod}
          hospitalSearchResult={hospitalSearchResult}
          selectedHospital={selectedHospital}
          searchFocus={searchFocus}
        />
      </Container>
    )
  }
}
