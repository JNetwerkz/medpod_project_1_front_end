import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import * as $ from 'jquery'
import axios from 'axios'

import { Form, Button } from 'semantic-ui-react'

import PatientModal from 'partial/modal/patient-modal'
import DoctorModal from 'partial/modal/doctor-modal'

class TransactionNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main form submission and data
      transactionNewForm: [],
      redirectToShow: false,
      redirectTo: '',
      // patient modal selection
      patientModalOpen: false,
      patientSearchResult: [],
      selectedPatient: {},
      patientId: '',
      searchFocus: false,
      // doctor modal selection
      doctorModalOpen: false,
      doctorSearchResult: [],
      selectedDoctor: {},
      doctorId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.patientModalMethod = this.patientModalMethod.bind(this)
    this.doctorModalMethod = this.doctorModalMethod.bind(this)
  }

  handleChange (event) {
    this.setState({
      transactionNewForm: $('#transaction_new-form').serializeArray()
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = this.state.transactionNewForm
    console.log(formData)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      data: formData
    })
    .then((res) => {
      console.log('new transaction data', res.data)
      this.setState({
        redirectToShow: true,
        redirectTo: res.data._id
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
          patientId: data._id
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
          doctorId: data._id
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
    return (
      <div>
        <Form id='transaction_new-form' onChange={(event) => this.handleChange(event)} onSubmit={(event) => this.handleSubmit(event)}>
          <h2>Enter New Transaction Information</h2>
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
            {/* <label>Patient_ID</label> */}
            <input readOnly hidden
              type='text'
              name='patient'
              onChange={() => console.log()}
              ref={(input) => {
                console.log('input', input)
                this.patientIdRef = input
              }}
              value={this.state.patientId} />
          </Form.Field>
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
            {/* <label>Doctor_ID</label> */}
            <input readOnly hidden
              type='text'
              name='receiving_doctor'
              onChange={() => console.log()}
              ref={(input) => {
                console.log('input', input)
                this.doctorIdRef = input
              }}
              value={this.state.doctorId} />
          </Form.Field>
          <Form.Field>
            <label>Invoice Date</label>
            <input type='date' name='invoice date' />
          </Form.Field>
          <Form.Field>
            <label>Invoice Number</label>
            <input type='text' name='invoice number' />
          </Form.Field>
          <Form.Field>
            <label>Charges to Patient</label>
            <input type='number' name='transaction amount' />
          </Form.Field>
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
      </div>
    )
  }
}

export default TransactionNew
