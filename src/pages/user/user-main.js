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

    const { email, password, displayName } = this.state

    const formData = {
      email, password, displayName
    }

    // if (!formData.email)
    // if (!formData.referral_agent) return this.setState({ errors: ['Please select Agent from search function provided'] })

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/user/new`,
      data: formData
    })
    .then((res) => {
      console.log(res)
      // const { errors } = res.data
      // errors
      // ? this.setState({ errors })
      // : this.setState({
      //   redirectToShow: true,
      //   redirectTo: res.data._id
      // })
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
       handleSelectChange
     } = this

    const IndexRows = userIndex.map((user) => {
      return <IndexRow userData={user} key={user.uid} />
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
