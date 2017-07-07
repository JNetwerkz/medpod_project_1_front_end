import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import axios from 'axios'
import * as $ from 'jquery'
import { Container } from 'semantic-ui-react'

import { AuthHeader } from 'custom-function'

import PatientIndex from './index/patient-index'
import PatientNew from './new/patient-new'
import PatientShow from './show/patient-show'

class PatientMain extends Component {
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
              (props) => <PatientShow {...props} />
            }
            path={`${this.props.match.url}/:id`}
          />
          <Route
            render={
              (props) => <PatientIndex {...props} />
            }
            path={`${this.props.match.url}`}
            />
        </Switch>
      </Container>
    )
  }
}

export default PatientMain
