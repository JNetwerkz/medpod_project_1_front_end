import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import AgentNew from './new/agent-new'
import AgentShow from './show/agent-show'
import AgentIndex from './index/agent-index'

export default class AgentMain extends Component {
  render () {
    return (
      <Container fluid>
        <h1>Doctor</h1>
        <li>
          <Link to={`${this.props.match.url}/new`}>Add Agent</Link>
        </li>
        <Switch>
          <Route exact
            path={`${this.props.match.url}/new`}
            render={(props) =>
              <AgentNew {...props} />
          } />
          <Route
            path={`${this.props.match.url}/:id`}
            render={(props) =>
              <AgentShow {...props} />
          } />
          <Route
            path={`${this.props.match.url}/`}
            render={(props) =>
              <AgentIndex {...props} />
          } />
        </Switch>
      </Container>
    )
  }
}
