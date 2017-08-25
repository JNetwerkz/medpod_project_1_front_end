import React, { Component } from 'react'

import { Input, Button, Container, Header, Segment, Form, Divider, TextArea } from 'semantic-ui-react'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

import CommissionTable from './_show-table'
import ErrorMessage from 'partial/error'
import EditButton from 'partial/_editButton'
import SaveButton from 'partial/_saveButton'
import S3Subheader from 'partial/_subheaders'

export default class AgentShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agentShow: {},
      notEditing: true,
      'first name': '',
      'last name': '',
      gender: '',
      'ic / passport': '',
      personalPhoneNumber: '',
      personalEmail: '',
      additionalInfo: '',
      segmentLoading: true,
      //
      errors: null
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
      const { errors } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        agentShow: res.data,
        notEditing: true,
        ...res.data,
        errors: null
      })
      // this.setState({ agentShow: res.data, notEditing: true, ...res.data })
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
      gender,
      'ic / passport': icPassport,
      personalPhoneNumber,
      personalEmail,
      additionalInfo,
      'transaction year': transactionYear,
      'transaction month': transactionMonth,
      page,
      pages,
      segmentLoading,
      commissionTableLoading,
      agentCommissions,
      errors
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

    const content = segmentLoading
    ? <Segment basic loading />
    : <Form>
      <S3Subheader text='Personal Information' />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>First Name</label>
          {
            notEditing
            ? <p>{firstName}</p>
            : <Input
              required
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
              value={gender}
              onChange={handleEditChange}
              name='gender'
              // transparent
              disabled={notEditing}
               />
          }
        </Form.Field>
      </Form.Group>
      <Divider hidden />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Contact Number</label>
          {
            notEditing
            ? <p>{personalPhoneNumber}</p>
            : <Input
              value={personalPhoneNumber}
              onChange={handleEditChange}
              name='personalPhoneNumber'
              // transparent
              disabled={notEditing}
               />
          }
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          {
            notEditing
            ? <p>{personalEmail}</p>
            : <Input
              value={personalEmail}
              onChange={handleEditChange}
              name='personalEmail'
              // transparent
              disabled={notEditing}
               />
          }
        </Form.Field>
      </Form.Group>
      <S3Subheader text='Additional Information' />
      {
        notEditing
        ? <p>{additionalInfo}</p>
        : <Form.Field control={TextArea}
          value={additionalInfo}
          onChange={handleEditChange}
          name='additionalInfo' />

      }
    </Form>

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Header as='h1'>
          {firstName} {lastName}
          <EditButton handleEditState={handleEditState} notEditing={notEditing} />
          <SaveButton handleUpdateSubmit={handleUpdateSubmit} notEditing={notEditing} />
        </Header>
        {content}
        <Divider section />
        <Header as='h2'>
          Commission Record
        </Header>
        <CommissionTable
          // handleSelectChange={handleSelectChange}
          // handleInputChange={handleInputChange}
          // handleSearchChange={handleSearchChange}
          // transactionYear={transactionYear}
          // transactionMonth={transactionMonth}
          // handlePaginate={handlePaginate}
          // page={page}
          // pages={pages}
          // agentCommissions={agentCommissions}
          match={this.props.match}
          // commissionTableLoading={commissionTableLoading}
        />
      </Container>
    )
  }

  componentDidMount () {
    const referralAgentId = this.props.match.params.id
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent/${referralAgentId}`
    })
    .then((res) => {
      console.log('AgentShow res', res.data)
      const {
        _id
      } = res.data

      this.setState({ agentShow: res.data, ...res.data, segmentLoading: false })
      return _id
    })
    .catch((err) => console.error(err))
  }
}
