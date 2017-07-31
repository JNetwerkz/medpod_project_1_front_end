import React, { Component } from 'react'

import { Input, Button, Container, Header, Segment, Form } from 'semantic-ui-react'
import axios from 'axios'

export default class AgentShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agentShow: {},
      notEditing: true,
      'first name': '',
      'last name': '',
      gender: ''
    }

    this.handleEditState = this.handleEditState.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
  }

  handleEditState (event) {
    const {
      notEditing,
      agentShow
    } = this.state

    if (notEditing) {
      // change to edit mode
      return this.setState({ notEditing: !notEditing })
    } else {
      // revert back to view mode
      return this.setState({ notEditing: !notEditing, ...agentShow })
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
      agentShow,
      notEditing,
      ...formData
    } = this.state

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent/${this.props.match.params.id}`,
      data: formData
    })
    .then((res) => {
      this.setState({ agentShow: res.data, notEditing: true, ...res.data })
    })
    .catch((err) => console.error(err))
  }

  render () {
    console.log(this.state)
    const {
      notEditing,
      agentShow,
      'first name': firstName,
      'last name': lastName,
      gender
    } = this.state

    const {
      handleEditState,
      handleEditChange,
      handleUpdateSubmit
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
          </Segment>
          <Button onClick={handleUpdateSubmit} positive>
            Confirm
          </Button>
        </Form>
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('AgentShow res', res.data)
      this.setState({ agentShow: res.data, ...res.data })
    })
    .catch((err) => console.error(err))
  }
}
