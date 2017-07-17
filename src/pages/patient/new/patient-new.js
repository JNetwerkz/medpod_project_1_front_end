import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import * as $ from 'jquery'
import axios from 'axios'

import { Form, Button } from 'semantic-ui-react'

import AgentModal from 'partial/modal/agent-modal'

class PatientNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientNewForm: [],
      redirectToShow: false,
      redirectTo: '',
      //
      agentModalOpen: false,
      agentSearchResult: [],
      selectedAgent: {},
      agentId: '',
      searchFocus: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.agentModalMethod = this.agentModalMethod.bind(this)
  }

  handleChange () {
    this.setState({
      patientNewForm: $('#patient_new-form').serializeArray()
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = this.state.patientNewForm

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
          agentId: data._id
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
    return (
      <div>
        <Form id='patient_new-form' onChange={(event) => this.handleChange(event)} onSubmit={(event) => this.handleSubmit(event)}>
          <h2>Enter New Patient Information</h2>
          <Form.Field>
            <label>First Name</label>
            <input type='text' name='first name'></input>
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input type='text' name='last name'></input>
          </Form.Field>
          <Form.Field>
            <label>IC / Passport</label>
            <input type='text' name='ic / passport'></input>
          </Form.Field>
          <Form.Field>
            <label>Gender</label>
            <input type='text' name='gender'></input>
          </Form.Field>
          <Form.Field>
            <label>Referral Agent</label>
            <input onClick={() => this.agentModalMethod('open')} type='text' name='agentName'
              readOnly
              onChange={() => console.log()}
              ref={(input) => {
                console.log('input', input)
                this.agentNameRef = input
              }}
              value={`${this.state.selectedAgent['first name'] || ''} ${this.state.selectedAgent['last name'] || ''}`} />
          </Form.Field>
          <Form.Field>
            {/* <label>Doctor_ID</label> */}
            <input readOnly hidden
              type='text'
              name='referral_agent'
              onChange={() => console.log()}
              ref={(input) => {
                console.log('input', input)
                this.agentIdRef = input
              }}
              value={this.state.agentId} />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
        <AgentModal
          agentModalOpen={this.state.agentModalOpen}
          modalMethod={this.agentModalMethod}
          agentSearchResult={this.state.agentSearchResult}
          selectedAgent={this.state.selectedAgent}
          searchFocus={this.state.searchFocus}
         />
      </div>
    )
  }
}

export default PatientNew
