import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { Container, Header, Icon, Table, Segment, Form, Input, Select } from 'semantic-ui-react'

import IndexRow from './_index-row'
import { auth, db, firebaseIdToken } from 'firebase-settings'
import { accessType } from 'custom-function'
import ErrorMessage from 'partial/error'

export default class UserMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userIndex: [],
      email: '',
      password: '',
      displayName: '',
      userType: '',
      errors: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleUserDelete = this.handleUserDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event, { value }) {
    const target = event.target

    const targetValue = value
    ? value
    : target.type === 'checkbox'
      ? target.checked
      : target.value

    const name = target.name
    console.log(name, targetValue)
    this.setState({
      [name]: targetValue
    })
  }

  handleSelectChange (event, value, name) {
    console.log(value, name)
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    console.log('handlesubmit event', event.target)

    const customErrorMsg = {
      email: 'Please specify a EMAIL for user',
      password: 'Please specify a PASSWORD for user',
      displayName: 'Please specify a NAME for user',
      userType: 'Please specify a USER TYPE for user'
    }

    const { email, password, displayName, userType } = this.state

    const formData = {
      email, password, displayName, userType
    }

    const objEntries = Object.entries(formData)

    let errors = []
    objEntries.forEach((arr) => {
      if (!arr[1]) errors.push(customErrorMsg[arr[0]])
    })

    if (errors.length) return this.setState({ errors })

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/user/new`,
      data: formData
    })
    .then((res) => {
      console.log(res)
      const { errors, uid, email, lastSignInTime, displayName } = res.data
      if (errors) return this.setState({ errors: [errors.message] })
      return new Promise((resolve, reject) => {
        let updateUserType = db.ref('users').update({
          [uid]: userType
        })
        console.log('updateusertype', updateUserType)
        updateUserType
        ? resolve({
          uid, email, lastSignInTime, displayName, userType
        })
        : reject('USERTYPE UPDATE FAILED')
      })
    })
    .then((res) => {
      const { userIndex } = this.state
      userIndex.push(res)

      return this.setState({ userIndex, email, password, displayName, userType })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  handleUserDelete (event) {
    const target = event.target
    const targetId = target.dataset.uid

    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_ENDPOINT}/user/${targetId}`
    })
    .then((res) => {
      console.log('delete response', res)
      return db.ref(`users/${targetId}`).remove()
    })
    .then(() => {
      const token = window.localStorage.getItem(firebaseIdToken)
      axios
      .get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/users.json?auth=${token}`)
      .then((res) => {
        return axios({
          method: 'POST',
          url: `${process.env.REACT_APP_API_ENDPOINT}/user`,
          data: res.data
        })
      })
      .then((res) => {
        return this.setState({ userIndex: res.data })
      })
    })
    .catch((err) => console.error(err))
  }

  componentDidMount () {
    const token = window.localStorage.getItem(firebaseIdToken)
    axios
    .get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/users.json?auth=${token}`)
    .then((res) => {
      return axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_ENDPOINT}/user`,
        data: res.data
      })
    })
    .then((res) => {
      return this.setState({ userIndex: res.data })
    })
  }

  render () {
    const {
      userIndex,
      email,
      password,
      displayName,
      userType,
      errors
     } = this.state

    const {
       handleSubmit,
       handleInputChange,
       handleSelectChange,
       handleUserDelete
     } = this

    const IndexRows = userIndex.map((user) => {
      if (user.userType !== 'master') return <IndexRow userData={user} key={user.uid} handleUserDelete={handleUserDelete} />
    })

    return (
      <Container fluid>
        <ErrorMessage errors={errors} />
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='users' />
            <Header.Content>
                Users
            </Header.Content>
          </Link>
          <Header.Subheader>
            Manage Users
          </Header.Subheader>
        </Header>
        <Container>
          <Table celled basic selectable definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Last Logged In</Table.HeaderCell>
                <Table.HeaderCell>User Access Type</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {IndexRows}
            </Table.Body>
          </Table>
          <Header as='h2'>New User</Header>
          <Segment>
            <Form onSubmit={handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Field control={Input} label='Email' name='email' placeholder='Email' value={email} onChange={handleInputChange} />
                <Form.Field control={Input} label='Password' name='password' placeholder='Password' value={password} onChange={handleInputChange} />
                <Form.Field control={Input} label='Username' name='displayName' placeholder='Username' value={displayName} onChange={handleInputChange} />
                <Form.Field control={Select} label='User Access' name='userType' options={accessType} placeholder='Access Type' value={userType} onChange={(event, {value}) => handleSelectChange(event, value, 'userType')} />
                <Form.Field>
                  <label>&nbsp;</label>
                  <Form.Button fluid type='submit'>Confirm</Form.Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Container>

      </Container>

    )
  }
}
