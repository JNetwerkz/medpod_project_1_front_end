import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import * as $ from 'jquery'

import { Form, Header, Container } from 'semantic-ui-react'

import HospitalModal from 'partial/modal/hospital-modal'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Others', value: 'others' }
]

class DoctorNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToShow: false,
      redirectTo: '',
      // form input fields
      'first name': '',
      'last name': '',
      'gender': '',
      'hospital': '',
      // modal
      hospitalModalOpen: false,
      hospitalSearchResult: [],
      selectedHospital: {},
      searchFocus: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.hospitalModalMethod = this.hospitalModalMethod.bind(this)
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

  handleSelectChange (event, value, name) {
    console.log(name, value)
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = this.state

    console.log(formData)

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor`,
      data: formData
    })
    .then((res) => {
      console.log('new doctor data', res.data)
      this.setState({
        redirectToShow: true,
        redirectTo: res.data._id
      })
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
        console.log(data)
        this.setState({
          selectedHospital: data,
          hospital: data._id
          // patientModalOpen: false
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
    if (this.state.redirectToShow) return <Redirect to={this.state.redirectTo} />
    return (
      <Container fluid>
        <Header as='h3' block inverted>
          Input New Doctor Information
        </Header>
        <Form id='doctor_new-form' onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Input label='First name' placeholder='First name' name='first name' onChange={this.handleInputChange} />

            <Form.Input label='Last name' placeholder='Last name' name='last name' onChange={this.handleInputChange} />

            <Form.Select label='Gender' options={options} placeholder='Gender' onChange={(e, {value}) => this.handleSelectChange(e, value, 'gender')} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Hospital</label>
              <input onClick={() => this.hospitalModalMethod('open')} type='text' name='hospitalName'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.hospitalNameRef = input
                }}
                value={`${this.state.selectedHospital.name || ''}`} />
            </Form.Field>

            <Form.Field>
              <label>Hospital ID</label>
              <input readOnly
                type='text'
                name='hospital'
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.hospitalIdRef = input
                }}
                value={this.state.hospital} />
            </Form.Field>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
        <HospitalModal
          hospitalModalOpen={this.state.hospitalModalOpen}
          modalMethod={this.hospitalModalMethod}
          hospitalSearchResult={this.state.hospitalSearchResult}
          selectedHospital={this.state.selectedHospital}
          searchFocus={this.state.searchFocus}
        />
      </Container>
    )
  }
}

export default DoctorNew
