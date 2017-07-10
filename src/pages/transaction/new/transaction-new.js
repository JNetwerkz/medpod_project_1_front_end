import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import * as $ from 'jquery'
import axios from 'axios'

import { Form, Button } from 'semantic-ui-react'

import PatientModal from './patient-modal'

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
      // doctor modal selection
      doctorModalOpen: false,
      doctorSearchResult: [],
      selectedDoctor: {},
      doctorId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.patientModalMethod = this.patientModalMethod.bind(this)
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
        this.setState({ patientModalOpen: true })
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
          id: data._id
          // patientModalOpen: false
        })

        const eventBubbleName = new Event('input', { bubbles: true })
        this.patientNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.patientIdRef.dispatchEvent(eventBubbleId)

        break
      case 'test1':
        console.log(('handle change called'))
        break
      case 'test2':
        console.log(('handle change called'))
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
            <label>Patient_ID</label>
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
            <label>Invoice Date</label>
            <input type='date' name='invoice date' />
          </Form.Field>
          <Form.Field>
            <label>Invoice Number</label>
            <input type='text' name='invoice number' />
          </Form.Field>
          <Form.Field>
            <label>Attending Doctor</label>
            <input type='text' name='attending doctor' />
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
          selectedPatient={this.state.selectedPatient} />
      </div>
    )
  }
}

export default TransactionNew
