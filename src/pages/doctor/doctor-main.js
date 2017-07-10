import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import DoctorNew from './new/doctor-new'
import DoctorShow from './show/doctor-show'

class DoctorMain extends Component {
  render () {
    return (
      <Container fluid>
        <h1>Doctor</h1>
        <li>
          <Link to={`${this.props.match.url}/new`}>Add Doctor</Link>
        </li>
        <Switch>
          <Route exact
            path={`${this.props.match.url}/new`}
            render={(props) =>
              <DoctorNew {...props} />
          } />
          <Route
            path={`${this.props.match.url}/:id`}
            render={(props) =>
              <DoctorShow {...props} />
          } />
        </Switch>
      </Container>
    )
  }
}

export default DoctorMain
