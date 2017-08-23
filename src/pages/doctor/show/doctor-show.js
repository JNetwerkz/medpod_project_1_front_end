import React, { Component } from 'react'

import { Segment, Form, Header, Container, Input, Divider, TextArea } from 'semantic-ui-react'

import axios from 'axios'

import HospitalModal from 'partial/modal/hospital-modal'
import ErrorMessage from 'partial/error'
import EditButton from 'partial/_editButton'
import SaveButton from 'partial/_saveButton'
import S3Subheader from 'partial/_subheaders'

class DoctorShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      doctorShow: {},
      notEditing: true,
      'first name': '',
      'last name': '',
      gender: '',
      hospital: {},
      associationName: '',
      associationAddress_street: '',
      associationAddress_unit: '',
      associationAddress_postalcode: '',
      associationAddress_country: '',
      associationPhoneNumber: '',
      associationEmail: '',
      additionalInfo: '',
      segmentLoading: true,
      // modal
      hospitalModalOpen: false,
      hospitalSearchResult: [],
      searchFocus: false,
      selectedHospital: '',
      errors: null
    }
    this.handleEditState = this.handleEditState.bind(this)
    this.hospitalModalMethod = this.hospitalModalMethod.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
  }

  handleEditState (event) {
    const {
      notEditing,
      doctorShow
    } = this.state

    if (notEditing) {
      // change to edit mode
      return this.setState({ notEditing: !notEditing })
    } else {
      // revert back to view mode
      return this.setState({ notEditing: !notEditing, ...doctorShow })
    }
  }

  handleEditChange (event) {
    const {
      value,
      name
    } = event.target

    console.log(name, value)

    this.setState({
      [name]: value
    })
  }

  handleUpdateSubmit () {
    const {
      'first name': firstName,
      'last name': lastName,
      gender,
      hospital,
      associationName,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail,
      additionalInfo
    } = this.state

    const formData = {
      'first name': firstName,
      'last name': lastName,
      gender,
      hospital: hospital._id,
      associationName,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail,
      additionalInfo
    }

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor/${this.props.match.params.id}`,
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
      // this.setState({ doctorShow: res.data, notEditing: true, ...res.data })
    })
    .catch((err) => console.error(err))
  }

  hospitalModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ hospitalModalOpen: true, searchFocus: true })
        break

      case 'close':
        console.log('closing modal')
        this.setState({ hospitalModalOpen: false })
        break

      case 'change':
        console.log('searching hospital')
        if (event.currentTarget.value.length >= 2) {
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}/hospital/search`, {
            params: { search: event.currentTarget.value }
          })
          .then((res) => {
            this.setState({ hospitalSearchResult: res.data })
          })
          .catch((err) => console.error(err))
        }
        break
      case 'select':
        console.log('select hospital')
        this.setState({
          hospital: data,
          selectedHospital: data
        })

        const eventBubbleName = new Event('input', { bubbles: true })
        this.hospitalNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.hospitalIdRef.dispatchEvent(eventBubbleId)

        break
      default:
        break
    }
  }

  render () {
    const {
      notEditing,
      doctorShow,
      'first name': firstName,
      'last name': lastName,
      gender,
      hospital,
      segmentLoading,
      associationName,
      associationAddress_street,
      associationAddress_unit,
      associationAddress_postalcode,
      associationAddress_country,
      associationPhoneNumber,
      associationEmail,
      additionalInfo,
      // modal
      hospitalModalOpen,
      hospitalSearchResult,
      selectedHospital,
      searchFocus,
      errors
    } = this.state

    const {
      name: hospitalName,
      _id: hospitalId
    } = hospital

    const {
      handleEditState,
      handleEditChange,
      handleUpdateSubmit,
      hospitalModalMethod
    } = this

    const content = segmentLoading
    ? <Segment basic loading />
    : <Form onSubmit={handleUpdateSubmit}>
      <S3Subheader text='Personal Information' />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>First Name</label>
          {
            notEditing
            ? <p>{firstName}</p>
            : <Input
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

      <S3Subheader text='Department / Institution / Clinic' />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Name</label>
          {
            notEditing
            ? <p>{associationName}</p>
            : <Input
              value={associationName}
              onChange={handleEditChange}
              name='associationName'
              // transparent
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
              // transparent
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
              // transparent
              disabled={notEditing}
               />
          }
        </Form.Field>
      </Form.Group>
      <Divider hidden />
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
              // transparent
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
              // transparent
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
              // transparent
              disabled={notEditing}
               />
          }
        </Form.Field>
      </Form.Group>
      <Divider hidden />
      <Form.Group>
        <Form.Field>
          <label>Country</label>
          {
            notEditing
            ? <p>{associationAddress_country}</p>
            : <Input
              value={associationAddress_country}
              onChange={handleEditChange}
              name='associationAddress_country'
              // transparent
              disabled={notEditing}
               />
          }
        </Form.Field>
      </Form.Group>
      <Divider hidden />
      <S3Subheader text='Hospital' />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Hospital</label>
          {
              notEditing
              ? <p>{hospitalName}</p>
              : <input onClick={() => this.hospitalModalMethod('open')} type='text' name='hospitalName'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.hospitalNameRef = input
                }}
                value={hospitalName} />
            }
        </Form.Field>
        <Form.Field>
          {
              notEditing
              ? ''
              : <label>Hospital ID</label>
            }
          {
              notEditing
              ? ''
              : <input readOnly
                type='text'
                name='hospital'
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.hospitalIdRef = input
                }}
                value={hospitalId} />
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
          Dr. {firstName} {lastName}
          <EditButton handleEditState={handleEditState} notEditing={notEditing} />
          <SaveButton handleUpdateSubmit={handleUpdateSubmit} notEditing={notEditing} />
        </Header>
        {content}
        <HospitalModal
          hospitalModalOpen={hospitalModalOpen}
          modalMethod={hospitalModalMethod}
          hospitalSearchResult={hospitalSearchResult}
          selectedHospital={selectedHospital}
          searchFocus={searchFocus}
        />
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('DoctorShow res', res.data)
      this.setState({ doctorShow: res.data, ...res.data, segmentLoading: false })
    })
    .catch((err) => console.error(err))
  }
}

export default DoctorShow
