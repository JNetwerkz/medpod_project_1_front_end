import React, { Component } from 'react'

import { Input, Button, Container, Header, Segment, Form } from 'semantic-ui-react'

import axios from 'axios'

import { combineName } from 'custom-function'

export default class HospitalShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hospitalShow: {},
      notEditing: true,
      name: '',
      address: ''
    }
    this.handleEditState = this.handleEditState.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
  }

  handleEditState () {
    const {
      notEditing,
      hospitalShow
    } = this.state

    if (notEditing) {
      // change to edit mode
      return this.setState({ notEditing: !notEditing })
    } else {
      // revert back to view mode
      return this.setState({ notEditing: !notEditing, ...hospitalShow })
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
      hospitalShow,
      notEditing,
      ...formData
    } = this.state

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital/${this.props.match.params.id}`,
      data: formData
    })
    .then((res) => {
      this.setState({ hospitalShow: res.data, notEditing: true, ...res.data })
    })
    .catch((err) => console.error(err))
  }

  render () {
    console.log(this.state)
    const {
      notEditing,
      hospitalShow,
      name,
      address
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
          {name}
          {editButton }
        </Header>
        <Form>
          <Segment>
            <Form.Group widths='equal'>
                <Form.Field>
                  <label>Name</label>
                  {
                notEditing
                ? <p>{name}</p>
                : <Input
                  size='huge'
                  value={name}
                  onChange={handleEditChange}
                  name='name'
                  // transparent
                  disabled={notEditing}
                   />
              }
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  {
                notEditing
                ? <p>{address}</p>
                : <Input
                  size='huge'
                  value={address}
                  onChange={handleEditChange}
                  name='address'
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
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('HospitalShow res', res.data)
      this.setState({ hospitalShow: res.data, ...res.data })
    })
    .catch((err) => console.error(err))
  }
}
