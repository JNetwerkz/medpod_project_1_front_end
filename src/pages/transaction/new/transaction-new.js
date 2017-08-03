import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import * as $ from 'jquery'
import axios from 'axios'

import { Form, Input, Button, Header, Container } from 'semantic-ui-react'

import PatientModal from 'partial/modal/patient-modal'
import DoctorModal from 'partial/modal/doctor-modal'
import ErrorMessage from 'partial/error'

class TransactionNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main form submission and data
      transactionNewForm: [],
      redirectToShow: false,
      redirectTo: '',
      // form data
      'invoice date': '',
      patient: '',
      'receiving_doctor': '',
      'invoice number': '',
      'transaction amount': '',
      // patient modal selection
      patientModalOpen: false,
      patientSearchResult: [],
      selectedPatient: {},
      searchFocus: false,
      // doctor modal selection
      doctorModalOpen: false,
      doctorSearchResult: [],
      selectedDoctor: {},
      errors: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.patientModalMethod = this.patientModalMethod.bind(this)
    this.doctorModalMethod = this.doctorModalMethod.bind(this)
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

  handleChange (event) {
    this.setState({
      transactionNewForm: $('#transaction_new-form').serializeArray()
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const formData = {
      patient: this.state.patient,
      receiving_doctor: this.state.receiving_doctor,
      'invoice date': this.state['invoice date'],
      'invoice number': this.state['invoice number'],
      'transaction amount': this.state['transaction amount']
    }

    if (!formData.patient) return this.setState({ errors: ['Please select Patient from search function provided'] })
    if (!formData.receiving_doctor) return this.setState({ errors: ['Please select Doctor from search function provided'] })

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      data: formData
    })
    .then((res) => {
      console.log('new transaction data', res.data)
      const { errors } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        redirectToShow: true,
        redirectTo: res.data._id,
        errors: null
      })
    })
    .catch((err) => console.error(err))
  }

  patientModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ patientModalOpen: true, searchFocus: true })
        break

      case 'close':
        console.log('closing modal')
        this.setState({ patientModalOpen: false })
        break

      case 'change':
        console.log('searching patient')
        if (event.currentTarget.value.length >= 2) {
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}/patient/search`, {
            params: { search: event.currentTarget.value }
          })
          .then((res) => {
            this.setState({ patientSearchResult: res.data })
          })
          .catch((err) => console.error(err))
        }
        break
      case 'select':
        console.log('select patient')
        console.log(data)
        this.setState({
          selectedPatient: data,
          patient: data._id
          // patientModalOpen: false
        })

        const eventBubbleName = new Event('input', { bubbles: true })
        this.patientNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.patientIdRef.dispatchEvent(eventBubbleId)

        break
      default:
        break
    }
  }

  doctorModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ doctorModalOpen: true })
        break

      case 'close':
        console.log('closing modal')
        this.setState({ doctorModalOpen: false })
        break

      case 'change':
        console.log('searching doctor')
        if (event.currentTarget.value.length >= 2) {
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}/doctor/search`, {
            params: { search: event.currentTarget.value }
          })
          .then((res) => {
            this.setState({ doctorSearchResult: res.data })
          })
          .catch((err) => console.error(err))
        }
        break
      case 'select':
        console.log('select doctor')
        console.log(data)
        this.setState({
          selectedDoctor: data,
          receiving_doctor: data._id
          // patientModalOpen: false
        })

        const eventBubbleName = new Event('input', { bubbles: true })
        this.doctorNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.doctorIdRef.dispatchEvent(eventBubbleId)

        break
      default:
        break
    }
  }

  render () {
    if (this.state.redirectToShow) {
      console.log('redirectToShow trans new', this.state.redirectTo)
      return <Redirect to={this.state.redirectTo} />
    }

    const { errors } = this.state

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Header as='h1'>
          Create New Transaction / Invoice
        </Header>
        <Form id='transaction_new-form' onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Patient</label>
              <input onClick={() => this.patientModalMethod('open')} type='text' name='patientName'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.patientNameRef = input
                }}
                value={`${this.state.selectedPatient['first name'] || ''} ${this.state.selectedPatient['last name'] || ''}`} />
            </Form.Field>
            <Form.Field>
              <label>Patient ID</label>
              <input readOnly
                type='text'
                name='patient'
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.patientIdRef = input
                }}
                value={this.state.patient} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Doctor</label>
              <input onClick={() => this.doctorModalMethod('open')} type='text' name='doctorName'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.doctorNameRef = input
                }}
                value={`${this.state.selectedDoctor['first name'] || ''} ${this.state.selectedDoctor['last name'] || ''}`} />
            </Form.Field>
            <Form.Field>
              <label>Doctor ID</label>
              <input readOnly
                type='text'
                name='receiving_doctor'
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.doctorIdRef = input
                }}
                value={this.state['receiving_doctor']} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field type='date' control={Input} label='Date of Transaction / Invoice' name='invoice date' placeholder='Date' onChange={this.handleInputChange} />
            <Form.Field type='text' control={Input} label='Transaction / Invoice Number' name='invoice number' placeholder='Transaction / Invoice Number' onChange={this.handleInputChange} />
            <Form.Field type='number' control={Input} label='Transaction / Invoice Amount' name='transaction amount' placeholder='Transaction / Invoice Amount' onChange={this.handleInputChange} />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
        <PatientModal
          patientModalOpen={this.state.patientModalOpen}
          modalMethod={this.patientModalMethod}
          patientSearchResult={this.state.patientSearchResult}
          selectedPatient={this.state.selectedPatient}
          searchFocus={this.state.searchFocus} />
        <DoctorModal
          doctorModalOpen={this.state.doctorModalOpen}
          modalMethod={this.doctorModalMethod}
          doctorSearchResult={this.state.doctorSearchResult}
          selectedDoctor={this.state.selectedDoctor} />
      </Container>
    )
  }
}

export default TransactionNew
