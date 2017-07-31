import React, { Component } from 'react'

import { Grid, Segment, Form, Header, Button, Container, Input } from 'semantic-ui-react'

import axios from 'axios'

import HospitalModal from 'partial/modal/hospital-modal'

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
      // modal
      hospitalModalOpen: false,
      hospitalSearchResult: [],
      searchFocus: false,
      selectedHospital: {}
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
      hospital
    } = this.state

    const formData = {
      'first name': firstName,
      'last name': lastName,
      gender,
      hospital: hospital._id
    }

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor/${this.props.match.params.id}`,
      data: formData
    })
    .then((res) => {
      console.log()
      this.setState({ doctorShow: res.data, notEditing: true, ...res.data })
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
    console.log(this.state)
    const {
      notEditing,
      doctorShow,
      'first name': firstName,
      'last name': lastName,
      gender,
      hospital,
      // modal
      hospitalModalOpen,
      hospitalSearchResult,
      selectedHospital,
      searchFocus
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

    const editButton = notEditing
    ? <Button type='button' primary floated='right' onClick={handleEditState}>Edit</Button>
    : <Button type='button' primary floated='right' onClick={handleEditState}>Cancel</Button>

    console.log(this.props)
    return (
      <Container>
        <Header as='h1'>
          Dr. {firstName} {lastName}
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
          </Segment>
          <Button onClick={handleUpdateSubmit} positive>
            Confirm
          </Button>
        </Form>
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
      this.setState({ doctorShow: res.data, ...res.data })
    })
    .catch((err) => console.error(err))
  }
}

export default DoctorShow
