import React, { Component } from 'react'

import { Input, Container, Header, Segment, Form } from 'semantic-ui-react'

import axios from 'axios'

import ErrorMessage from 'partial/error'
import EditButton from 'partial/_editButton'
import SaveButton from 'partial/_saveButton'
import S3Subheader from 'partial/_subheaders'

export default class HospitalShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hospitalShow: {},
      notEditing: true,
      name: '',
      nameAbbreviation: '',
      associationAddress_street: '',
      associationAddress_unit: '',
      associationAddress_postalcode: '',
      associationAddress_country: '',
      associationPhoneNumber: '',
      associationEmail: '',
      errors: null,
      segmentLoading: true
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
      const { errors } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        doctorShow: res.data,
        notEditing: true,
        ...res.data,
        errors: null
      })
    })
    .catch((err) => console.error(err))
  }

  render () {
    const {
      notEditing,
      name,
      nameAbbreviation,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail,
      errors,
      segmentLoading
    } = this.state

    const {
      handleEditState,
      handleEditChange,
      handleUpdateSubmit
    } = this
    const content = segmentLoading
    ? <Segment basic loading />
    : <Form onSubmit={handleUpdateSubmit}>
      <S3Subheader text='Basic Information' />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Name</label>
          {
            notEditing
            ? <p>{name}</p>
            : <Input
              value={name}
              onChange={handleEditChange}
              name='name'
              disabled={notEditing}
               />
          }
        </Form.Field>
        <Form.Field>
          <label>Name Abbreviation</label>
          {
            notEditing
            ? <p>{nameAbbreviation}</p>
            : <Input
              value={nameAbbreviation}
              onChange={handleEditChange}
              name='nameAbbreviation'
              disabled={notEditing}
               />
          }
        </Form.Field>
        <Form.Field>
          <label>Contact Number</label>
          {
            notEditing
            ? <p>{associationPhoneNumber}</p>
            : <Input
              value={associationPhoneNumber}
              onChange={handleEditChange}
              name='associationPhoneNumber'
              disabled={notEditing}
               />
          }
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          {
            notEditing
            ? <p>{associationEmail}</p>
            : <Input
              value={associationEmail}
              onChange={handleEditChange}
              name='associationEmail'
              disabled={notEditing}
               />
          }
        </Form.Field>
      </Form.Group>
      <S3Subheader text='Address' />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Unit Number</label>
          {
            notEditing
            ? <p>{associationAddress_unit}</p>
            : <Input
              value={associationAddress_unit}
              onChange={handleEditChange}
              name='associationAddress_unit'
              disabled={notEditing}
               />
          }
        </Form.Field>
        <Form.Field>
          <label>Block & Street</label>
          {
            notEditing
            ? <p>{associationAddress_street}</p>
            : <Input
              value={associationAddress_street}
              onChange={handleEditChange}
              name='associationAddress_street'
              disabled={notEditing}
               />
          }
        </Form.Field>
        <Form.Field>
          <label>Postal Code</label>
          {
            notEditing
            ? <p>{associationAddress_postalcode}</p>
            : <Input
              value={associationAddress_postalcode}
              onChange={handleEditChange}
              name='associationAddress_postalcode'
              disabled={notEditing}
               />
          }
        </Form.Field>
        <Form.Field>
          <label>Country</label>
          {
            notEditing
            ? <p>{associationAddress_country}</p>
            : <Input
              value={associationAddress_country}
              onChange={handleEditChange}
              name='associationAddress_country'
              disabled={notEditing}
               />
          }
        </Form.Field>
      </Form.Group>
    </Form>

    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Header as='h1'>
          {name}
          <EditButton handleEditState={handleEditState} notEditing={notEditing} />
          <SaveButton handleUpdateSubmit={handleUpdateSubmit} notEditing={notEditing} />
        </Header>
        {content}
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital/${this.props.match.params.id}`
    })
    .then((res) => {
      this.setState({ hospitalShow: res.data, ...res.data, segmentLoading: false })
    })
    .catch((err) => console.error(err))
  }
}
