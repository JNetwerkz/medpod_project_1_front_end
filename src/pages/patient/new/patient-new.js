import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import * as $ from 'jquery'
import axios from 'axios'

import { Form, Button, Header, Input, Select, Container } from 'semantic-ui-react'

import AgentModal from 'partial/modal/agent-modal'

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
      'ic / passport': '',
      'referral_agent': '',
      //
      agentModalOpen: false,
      agentSearchResult: [],
      selectedAgent: {},
      searchFocus: false
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

  handleChange () {
    this.setState({
      patientNewForm: $('#patient_new-form').serializeArray()
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const formData = {
      'first name': this.state['first name'],
      'last name': this.state['last name'],
      gender: this.state.gender,
      'ic / passport': this.state['ic / passport'],
      referral_agent: this.state.referral_agent
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      data: formData
    })
    .then((res) => {
      console.log('new patient data', res.data)
      this.setState({
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
      'ic / passport': icPassport,
      referral_agent: referralAgent
    } = this.state

    return (
      <Container fluid>
        <Header as='h3' block inverted>
          Input New Patient Information
        </Header>
        <Form id='patient_new-form' onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='First name' name='first name' placeholder='First name' value={firstName} onChange={this.handleInputChange} />

            <Form.Field control={Input} label='Last name' name='last name' placeholder='Last name' value={lastName} onChange={this.handleInputChange} />

            <Form.Field control={Input} label='IC / Passport' name='ic / passport' placeholder='IC / Passport' value={icPassport} onChange={this.handleInputChange} />

            <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' value={gender} onChange={(e, {value}) => this.handleSelectChange(e, value, 'gender')} />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field>
              <label>Referral Agent</label>
              <input onClick={() => this.agentModalMethod('open')} type='text' name='agentName'
                placeholder='Click here to search for agent'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.agentNameRef = input
                }}
                value={`${this.state.selectedAgent['first name'] || ''} ${this.state.selectedAgent['last name'] || ''}`} />
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
          <Button type='submit'>Submit</Button>
        </Form>
        <AgentModal
          agentModalOpen={this.state.agentModalOpen}
          modalMethod={this.agentModalMethod}
          agentSearchResult={this.state.agentSearchResult}
          selectedAgent={this.state.selectedAgent}
          searchFocus={this.state.searchFocus}
         />
      </Container>
    )
  }
}

export default PatientNew
