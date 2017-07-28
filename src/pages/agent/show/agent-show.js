import React, { Component } from 'react'

import { Input, Button, Container, Header, Segment, Grid, Form } from 'semantic-ui-react'
import axios from 'axios'

import { combineName } from 'custom-function'
import './agent-show.css'

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
      handleEditChange
    } = this

    const editButton = notEditing
    ? <Button type='button' onClick={handleEditState}>Edit</Button>
    : <Button type='button' onClick={handleEditState}>Cancel</Button>

    return (
      <Container>
        <h1>Agent Show</h1>
        {editButton}
        <Form>
        <Grid columns='equal'>
          <Grid.Column>
            <Form.Field>
              <label>First Name</label>
              {
                notEditing
                ? firstName
                : <Input
                  size='massive'
                  className='testing'
                  value={firstName}
                  onChange={handleEditChange}
                  name='first name'
                  // transparent
                  disabled={notEditing}
                   />
              }
              {/* {firstName} */}
              {/* <Input
                size='massive'
                className='testing'
                value={firstName}
                onChange={handleEditChange}
                name='first name'
                transparent
                disabled={notEditing}
                 /> */}
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>Last Name</label>
              <Input
                value={lastName}
                onChange={handleEditChange}
                name='last name'
                transparent
                disabled={notEditing}
                 />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>Gender</label>
              <Input
                value={gender}
                onChange={handleEditChange}
                name='gender'
                transparent
                disabled={notEditing}
                 />
            </Form.Field>
          </Grid.Column>
        </Grid>
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
      this.setState({ agentShow: res.data, agentShowEdit: res.data, ...res.data })
    })
    .catch((err) => console.error(err))
  }
}
