import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container, Header, Icon, Dropdown } from 'semantic-ui-react'

import AgentNew from './new/agent-new'
import AgentShow from './show/agent-show'
import AgentIndex from './index/agent-index'

export default class AgentMain extends Component {
  render () {
    return (
      <Container>
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='spy' />
            <Header.Content>
                Agents
            </Header.Content>
          </Link>
          <Header.Subheader>
            <Dropdown as='h4' text={'Manage Agents'}>
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item as={Link} to={`/agent/new`} icon='plus' text='Add New Agent' />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Subheader>
        </Header>

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
