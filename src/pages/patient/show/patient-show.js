import React, { Component } from 'react'

import { Container, Header, Form, Segment, Input, Button } from 'semantic-ui-react'
import axios from 'axios'

import { combineName } from 'custom-function'
import AgentModal from 'partial/modal/agent-modal'

class PatientShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientShow: {},
      notEditing: true,
      'first name': '',
      'last name': '',
      'ic / passport': '',
      gender: '',
      referral_agent: {},
      // modal
      agentModalOpen: false,
      agentSearchResult: [],
      selectedAgent: {},
      searchFocus: false
    }
    this.handleEditState = this.handleEditState.bind(this)
    this.agentModalMethod = this.agentModalMethod.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
  }

  handleEditState (event) {
    const {
      notEditing,
      patientShow
    } = this.state

    if (notEditing) {
      // change to edit mode
      return this.setState({ notEditing: !notEditing })
    } else {
      // revert back to view mode
      return this.setState({ notEditing: !notEditing, ...patientShow })
    }
  }

  handleEditChange (event) {
    const {
      value,
      name
    } = event.target

    this.setState({
      [name]: value
    })

    console.log(name, value)
  }

  handleUpdateSubmit () {
    const {
      'first name': firstName,
      'last name': lastName,
      gender,
      referral_agent
    } = this.state

    const formData = {
      'first name': firstName,
      'last name': lastName,
      gender,
      referral_agent: referral_agent._id
    }

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient/${this.props.match.params.id}`,
      data: formData
    })
    .then((res) => {
      console.log()
      this.setState({ patientShow: res.data, notEditing: true, ...res.data })
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
          referral_agent: data
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
    console.log(this.props)
    const {
      notEditing,
      patientShow,
      'first name': firstName,
      'last name': lastName,
      'ic / passport': icPassport,
      gender,
      referral_agent,
      // modal
      agentModalOpen,
      agentSearchResult,
      selectedAgent,
      searchFocus
    } = this.state

    const {
      'first name': agentFirstName,
      'last name': agentLastName,
      _id: agentId
    } = referral_agent

    const {
      handleEditState,
      handleEditChange,
      handleUpdateSubmit,
      agentModalMethod
    } = this

    const editButton = notEditing
    ? <Button type='button' primary floated='right' onClick={handleEditState}>Edit</Button>
    : <Button type='button' primary floated='right' onClick={handleEditState}>Cancel</Button>

    return (
      <Container>
        <Header as='h1'>
          {firstName} {lastName}
          {editButton}
        </Header>
        <Form>
          <Segment>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>First Name</label>
                {
                notEditing
                ? <p>{firstName}</p>
                : <Input
                  size='huge'
                  value={firstName}
                  onChange={handleEditChange}
                  name='first name'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                {
                notEditing
                ? <p>{lastName}</p>
                : <Input
                  size='huge'
                  value={lastName}
                  onChange={handleEditChange}
                  name='last name'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
              <Form.Field>
                <label>IC / Passport</label>
                {
                notEditing
                ? <p>{icPassport}</p>
                : <Input
                  size='huge'
                  value={icPassport}
                  onChange={handleEditChange}
                  name='ic / passport'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
              <Form.Field>
                <label>Gender</label>
                {
                notEditing
                ? <p>{gender}</p>
                : <Input
                  size='huge'
                  value={gender}
                  onChange={handleEditChange}
                  name='gender'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Agent</label>
                {
                  notEditing
                  ? <p>{agentFirstName} {agentLastName}</p>
                  : <input onClick={() => this.agentModalMethod('open')} type='text' name='agentName'
                    readOnly
                    onChange={() => console.log()}
                    ref={(input) => {
                      console.log('input', input)
                      this.agentNameRef = input
                    }}
                    value={`${agentFirstName} ${agentLastName}`} />
                }
              </Form.Field>
              <Form.Field>
                {
                  notEditing
                  ? ''
                  : <label>Agent ID</label>
                }
                {
                  notEditing
                  ? ''
                  : <input readOnly
                    type='text'
                    name='referral_agent'
                    onChange={() => console.log()}
                    ref={(input) => {
                      console.log('input', input)
                      this.agentIdRef = input
                    }}
                    value={agentId} />
                }

              </Form.Field>
            </Form.Group>
          </Segment>
          <Button onClick={handleUpdateSubmit} positive>
            Confirm
          </Button>
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

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('PatientShow res', res.data)
      this.setState({ patientShow: res.data, ...res.data })
    })
    .catch((err) => console.error(err))
  }
}

export default PatientShow
