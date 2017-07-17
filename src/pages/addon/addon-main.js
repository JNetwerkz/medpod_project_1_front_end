import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import AddonNew from './new/addon-new'
import AddonShow from './show/addon-show'
import AddonIndex from './index/addon-index'

export default class AddonMain extends Component {
  render () {
    return (
      <Container fluid>
        <h1>Addon</h1>
        <li>
          <Link to={`${this.props.match.url}/new`}>Add Addon</Link>
        </li>
        <Switch>
          <Route exact
            path={`${this.props.match.url}/new`}
            render={(props) =>
              <AddonNew {...props} />
          } />
          <Route
            path={`${this.props.match.url}/:id`}
            render={(props) =>
              <AddonShow {...props} />
          } />
          <Route
            path={`${this.props.match.url}/`}
            render={(props) =>
              <AddonIndex {...props} />
          } />
        </Switch>
      </Container>
    )
  }
}
