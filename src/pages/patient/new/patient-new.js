import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'

import { Form, Header, Input, Select, Container, Button, Divider, TextArea } from 'semantic-ui-react'

import AgentModal from 'partial/modal/agent-modal'
import ErrorMessage from 'partial/error'
import S3Subheader from 'partial/_subheaders'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Others', value: 'others' }
]

class PatientNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',
      // form input fields
      'first name': '',
      'last name': '',
      'gender': '',
      dob: '',
      'ic / passport': '',
      'referral_agent': '',
      personalPhoneNumber: '',
      personalEmail: '',
      additionalInfo: '',
      //
      agentModalOpen: false,
      agentSearchResult: [],
      selectedAgent: '',
      // selectedAgent: {},
      searchFocus: false,
      errors: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.agentModalMethod = this.agentModalMethod.bind(this)
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

    const formData = {
      'first name': this.state['first name'],
      'last name': this.state['last name'],
      gender: this.state.gender,
      'ic / passport': this.state['ic / passport'],
      referral_agent: this.state.referral_agent,
      personalPhoneNumber: this.state.personalPhoneNumber,
      personalEmail: this.state.personalEmail,
      additionalInfo: this.state.additionalInfo,
      dob: this.state.dob
    }

    if (!formData.referral_agent) return this.setState({ errors: ['Please select Agent from search function provided'] })

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
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

  agentModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ agentModalOpen: true, searchFocus: true })
        break

      case 'close':
        console.log('closing modal')
        this.setState({ agentModalOpen: false })
        break

      case 'change':
        console.log('searching agent')
        if (event.currentTarget.value.length >= 2) {
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}/agent/search`, {
            params: { search: event.currentTarget.value }
          })
          .then((res) => {
            this.setState({ agentSearchResult: res.data })
          })
          .catch((err) => console.error(err))
        }
        break
      case 'select':
        console.log('select agent')
        console.log(data)
        this.setState({
          selectedAgent: data,
          referral_agent: data._id
          // patientModalOpen: false
        })

        const eventBubbleName = new Event('input', { bubbles: true })
        this.agentNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.agentIdRef.dispatchEvent(eventBubbleId)

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
      gender,
      dob,
      'ic / passport': icPassport,
      referral_agent: referralAgent,
      personalPhoneNumber,
      personalEmail,
      additionalInfo,
      errors,
      agentModalOpen,
      agentSearchResult,
      selectedAgent,
      searchFocus
    } = this.state

    const {
      handleInputChange,
      handleSubmit,
      handleSelectChange,
      agentModalMethod
    } = this

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Form id='patient_new-form' onSubmit={(event) => handleSubmit(event)}>
          <Header as='h1'>
          New Patient
          <Button floated='right'>Submit</Button>
          </Header>

          <S3Subheader text='Personal Information' />
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='First name' name='first name' placeholder='First name' value={firstName} onChange={handleInputChange} />

            <Form.Field control={Input} label='Last name' name='last name' placeholder='Last name' value={lastName} onChange={handleInputChange} />

            <Form.Field control={Input} label='IC / Passport' name='ic / passport' placeholder='IC / Passport' value={icPassport} onChange={handleInputChange} />

            <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' value={gender} onChange={(e, {value}) => handleSelectChange(e, value, 'gender')} />
          </Form.Group>
          <Divider hidden />
          <Form.Group widths='equal'>
            <Form.Field control={Input} type='date' label='D.O.B' name='dob' value={dob} onChange={handleInputChange} />

            <Form.Field control={Input} label='Contact Number' name='personalPhoneNumber' placeholder='8125 XXXX' value={personalPhoneNumber} onChange={handleInputChange} />

            <Form.Field control={Input} label='Email' name='personalEmail' placeholder='client@mail.com' value={personalEmail} onChange={handleInputChange} />
          </Form.Group>

          <S3Subheader text='Referral Agent' />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Name</label>
              <input onClick={() => agentModalMethod('open')} type='text' name='agentName'
                placeholder='Click here to search for agent'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.agentNameRef = input
                }}
                value={`${selectedAgent['first name'] || ''} ${selectedAgent['last name'] || ''}`} />
            </Form.Field>

            <Form.Field>
              <label>Referral_Agent ID</label>
              <input readOnly
                type='text'
                value={referralAgent}
                name='referral_agent'
                onChange={() => console.log()}
                ref={(input) => {
                  this.agentIdRef = input
                }}
              />
            </Form.Field>
          </Form.Group>
          <S3Subheader text='Additional Information' />
          <Form.Field control={TextArea}
            value={additionalInfo}
            onChange={handleInputChange}
            name='additionalInfo' />

        </Form>
        <AgentModal
          agentModalOpen={agentModalOpen}
          modalMethod={agentModalMethod}
          agentSearchResult={agentSearchResult}
          selectedAgent={selectedAgent}
          searchFocus={searchFocus}
         />
      </Container>
    )
  }
}

export default PatientNew
