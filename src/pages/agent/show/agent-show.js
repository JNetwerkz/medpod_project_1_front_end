import React, { Component } from 'react'

import { Input, Button, Container, Header, Segment, Form } from 'semantic-ui-react'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

import TransactionTable from './_show-table'

export default class AgentShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agentShow: {},
      agentTransactions: [],
      notEditing: true,
      'first name': '',
      'last name': '',
      gender: '',
      page: '',
      pages: '',
      //
      'transaction year': moment().year(),
      'transaction month': moment().month() + 1
    }

    this.handleEditState = this.handleEditState.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handlePaginate = this.handlePaginate.bind(this)
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

  handleSelectChange (event, value, name) {
    this.setState({
      [name]: value
    })
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

  handleSearchChange () {
    this.setState({ searchLoading: true })
    const {
      'transaction year': transactionYear,
      'transaction month': transactionMonth
    } = this.state

    const formData = {
      'transaction year': transactionYear,
      'transaction month': transactionMonth
    }
    const queryString = qs.stringify(formData)

    console.log(queryString)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent/${this.props.match.params.id}/transaction`,
      params: {
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: agentTransactions,
        page,
        pages
      } = res.data

      this.setState({ agentTransactions, page, pages, searchLoading: false })
    })
  }

  handlePaginate (event) {
    const {
      'transaction year': transactionYear,
      'transaction month': transactionMonth
    } = this.state

    const formData = {
      'transaction year': transactionYear,
      'transaction month': transactionMonth
    }
    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent/${this.props.match.params.id}/transaction`,
      params: {
        page: parseInt(event.target.dataset.page),
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: agentTransactions,
        page,
        pages
      } = res.data

      this.setState({ agentTransactions, page, pages })
    })
  }

  render () {
    console.log(this.state)
    const {
      notEditing,
      agentShow,
      'first name': firstName,
      'last name': lastName,
      gender,
      'transaction year': transactionYear,
      'transaction month': transactionMonth,
      page,
      pages,
      agentTransactions
    } = this.state

    const {
      handleEditState,
      handleEditChange,
      handleUpdateSubmit,
      handleSelectChange,
      handleInputChange,
      handleSearchChange,
      handlePaginate
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
        <Header as='h2'>
          Agent's Transaction
        </Header>
        <TransactionTable
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
          handleSearchChange={handleSearchChange}
          transactionYear={transactionYear}
          transactionMonth={transactionMonth}
          handlePaginate={handlePaginate}
          page={page}
          pages={pages}
          agentTransactions={agentTransactions}
          match={this.props.match}
        />
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
      const {
        _id
      } = res.data
      this.setState({ agentShow: res.data, ...res.data })
      return _id
    })
    .then((id) => {
      return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_ENDPOINT}/agent/${this.props.match.params.id}/transaction`
      })
    })
    .then((res) => {
      const {
        docs: agentTransactions,
        total,
        ...rest
      } = res.data
      this.setState({ agentTransactions, ...rest })
    })
    .catch((err) => console.error(err))
  }
}
