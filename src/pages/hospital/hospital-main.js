import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import HospitalNew from './new/hospital-new'
import HospitalShow from './show/hospital-show'
import HospitalIndex from './index/hospital-index'

export default class HospitalMain extends Component {
  render () {
    return (
      <Container fluid>
        <h1>Hospital</h1>
        <li>
          <Link to={`${this.props.match.url}/new`}>Add Hospital</Link>
        </li>
        <Switch>
          <Route exact
            path={`${this.props.match.url}/new`}
            render={(props) =>
              <HospitalNew {...props} />
          } />
          <Route
            path={`${this.props.match.url}/:id`}
            render={(props) =>
              <HospitalShow {...props} />
          } />
          <Route
            path={`${this.props.match.url}/`}
            render={(props) =>
              <HospitalIndex {...props} />
          } />
        </Switch>
      </Container>
    )
  }
}
