import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import axios from 'axios'
import * as $ from 'jquery'
import { Container } from 'semantic-ui-react'

import AuthHeader from '../../auth-header'

import PatientIndex from './components/patient-index'
import PatientNew from './components/patient-new'
import PatientShow from './components/patient-show'

class PatientMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientNewForm: [],
      patientIndex: []
    }

    this.new_handleSubmit = this.new_handleSubmit.bind(this)
    this.new_handleChange = this.new_handleChange.bind(this)
  }

  new_handleChange () {
    this.setState({
      patientNewForm: $('#patient_new-form').serializeArray()
    })
  }

  new_handleSubmit (event) {
    event.preventDefault()
    const formData = this.state.patientNewForm

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      data: formData,
      headers: AuthHeader()
    })
    .then((res) => {
      console.log('new patient data', res.data)
      window.location = `/patient/${res.data._id}`
    })
      
    .catch((err) => console.error(err))
  }

  render () {
    return (
      <Container fluid>
        <h1>Patients</h1>
          <li>
            <Link to={`${this.props.match.url}/new`}>Add Patient</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}`}>Back</Link>
          </li>
        <Switch>
          <Route
            exact
            render={
              (props) => <PatientNew {...props} handleSubmit={this.new_handleSubmit} handleChange={this.new_handleChange} />
            }
            path={`${this.props.match.url}/new`} />
          <Route
            render={
              (props) => <PatientShow {...props} patientData={this.state.patientData} />
            }
            path={`${this.props.match.url}/:id`}
          />
          <Route
            render={
              (props) => <PatientIndex {...props} patientIndex={this.state.patientIndex} />
            }
            path={`${this.props.match.url}`}
            />
        </Switch>
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      headers: AuthHeader()
    })
    .then((res) => {
      console.log('PatientIndex res', res.data)
      this.setState({ patientIndex: res.data })
    })
  }
}

export default PatientMain
