import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import axios from 'axios'

import { Form, Input, Button, Header, Container, Divider, Checkbox, TextArea } from 'semantic-ui-react'

import { combineName } from 'custom-function'

import PatientModal from 'partial/modal/patient-modal'
import DoctorModal from 'partial/modal/doctor-modal'
import ErrorMessage from 'partial/error'
import S3Subheader from 'partial/_subheaders'

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
      additionalInfo: '',
      // patient modal selection
      patientModalOpen: false,
      patientSearchResult: [],
      selectedPatient: '',
      searchFocus: false,
      referralAgent: {},
      referralAgentId: '',
      checkboxDisabled: true,
      // doctor modal selection
      doctorModalOpen: false,
      doctorSearchResult: [],
      selectedDoctor: '',
      errors: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.patientModalMethod = this.patientModalMethod.bind(this)
    this.doctorModalMethod = this.doctorModalMethod.bind(this)
  }

  handleInputChange (event, data) {
    console.log(event, data, event.target.type)

    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleCheckboxChange (event, data) {
    console.log(event, data)
    const {
      referralAgentId,
      referralAgent } = this.state

    this.setState({
      referralAgentId: data.checked ? referralAgent._id : ''
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

    console.log(this.state.referralAgentId)

    const formData = {
      patient: this.state.patient,
      receiving_doctor: this.state.receiving_doctor,
      'invoice date': this.state['invoice date'],
      'invoice number': this.state['invoice number'],
      'transaction amount': this.state['transaction amount'],
      additionalInfo: this.state.additionalInfo
    }

    if (!formData.patient) return this.setState({ errors: ['Please select Patient from search function provided'] })
    if (!formData.receiving_doctor) return this.setState({ errors: ['Please select Doctor from search function provided'] })

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      data: formData
    })
    .then((transactionNewRes) => {
      console.log('new transaction data', transactionNewRes.data)
      const { errors, _id, 'transaction month': transactionMonth, 'transaction year': transactionYear } = transactionNewRes.data

      if (errors) return this.setState({ errors })
      if (this.state.referralAgentId) return axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_ENDPOINT}/commission`,
        data: {
          referralAgentId: this.state.referralAgentId || '',
          transactionId: _id,
          transactionMonth,
          transactionYear
        }
      })

      this.setState({
        redirectToShow: true,
        redirectTo: transactionNewRes.data._id,
        errors: null
      })
    })
    .then((commissionNewRes) => {
      this.setState({
        redirectToShow: true,
        redirectTo: commissionNewRes.data.transactionId,
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
          patient: data._id,
          referralAgent: data.referral_agent,
          referralAgentId: data.referral_agent._id,
          checkboxDisabled: !data.referral_agent._id
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

    const {
      errors,
      selectedPatient,
      patient,
      selectedDoctor,
      receiving_doctor,
      patientModalOpen,
      patientSearchResult,
      searchFocus,
      doctorModalOpen,
      doctorSearchResult,
      agentChecked,
      referralAgent,
      referralAgentId,
      checkboxDisabled
    } = this.state

    const {
      handleSubmit,
      patientModalMethod,
      doctorModalMethod,
      handleInputChange,
      handleCheckboxChange
    } = this

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Form id='transaction_new-form' onSubmit={(event) => handleSubmit(event)}>
          <Header as='h1'>
          New Transaction / Invoice from Hospital
          <Button floated='right'>Submit</Button>
          </Header>
          <S3Subheader text='Select Patient Invoiced by Hospital' />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Name</label>
              <input onClick={() => patientModalMethod('open')} type='text' name='patientName'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.patientNameRef = input
                }}
                value={`${selectedPatient['first name'] || ''} ${selectedPatient['last name'] || ''}`} />
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
                value={patient} />
            </Form.Field>
          </Form.Group>
          <Checkbox
            value={referralAgentId}
            defaultChecked
            disabled={checkboxDisabled}
            name='agentCommission'
            label={<label>Agent <Link to={`/agent/${referralAgentId}`}>{combineName(referralAgent)}</Link> qualify for Commission?</label>}
            onChange={handleCheckboxChange} />
          <S3Subheader text='Select Doctor Invoicing' />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Name</label>
              <input onClick={() => doctorModalMethod('open')} type='text' name='doctorName'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.doctorNameRef = input
                }}
                value={`${selectedDoctor['first name'] || ''} ${selectedDoctor['last name'] || ''}`} />
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
                value={receiving_doctor} />
            </Form.Field>
          </Form.Group>
          <S3Subheader text='Transaction Details' />
          <Form.Group widths='equal'>
            <Form.Field type='date' control={Input} label='Date of Transaction / Invoice' name='invoice date' placeholder='Date' onChange={handleInputChange} />
            <Form.Field type='text' control={Input} label='Transaction / Invoice Number' name='invoice number' placeholder='Transaction / Invoice Number' onChange={handleInputChange} />
            <Form.Field type='number' control={Input} label='Transaction / Invoice Amount' name='transaction amount' placeholder='Transaction / Invoice Amount' onChange={handleInputChange} />
          </Form.Group>
          <S3Subheader text='Additional Information' />
          <Form.Field control={TextArea}
            onChange={handleInputChange}
            name='additionalInfo' />
        </Form>
        <PatientModal
          patientModalOpen={patientModalOpen}
          modalMethod={patientModalMethod}
          patientSearchResult={patientSearchResult}
          selectedPatient={selectedPatient}
          searchFocus={searchFocus} />
        <DoctorModal
          doctorModalOpen={doctorModalOpen}
          modalMethod={doctorModalMethod}
          doctorSearchResult={doctorSearchResult}
          selectedDoctor={selectedDoctor} />
      </Container>
    )
  }
}

export default TransactionNew
