import React, { Component } from 'react'
import { Link, Route, Switch} from 'react-router-dom'
import axios from 'axios'

import * as $ from 'jquery'

import { Container } from 'semantic-ui-react'

import PatientIndex from './components/patient-index'
import PatientNew from './components/patient-new'

class PatientMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientNewForm: []
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
    console.log(process.env.REACT_APP_API_ENDPOINT)

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      data: formData
    })

  }

  render () {
    console.log(this.props)
    return (
        <Container fluid>
          <h1>Patients</h1>
          <Link to={`${this.props.match.url}/new`}>Add Patient</Link>
          {/* <PatientNew /> */}
            <Route
              render={
                (props) => <PatientNew {...props} handleSubmit={this.new_handleSubmit} handleChange={this.new_handleChange} />
              }
              path={`${this.props.match.url}/new`} />
        </Container>
    )
  }
}

export default PatientMain
