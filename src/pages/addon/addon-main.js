import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container, Header, Icon, Dropdown } from 'semantic-ui-react'

import AddonNew from './new/addon-new'
import AddonShow from './show/addon-show'
import AddonIndex from './index/addon-index'

export default class AddonMain extends Component {
  render () {
    return (
      <Container fluid>
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='add to cart' />
            <Header.Content>
                Add-ons
            </Header.Content>
          </Link>
          <Header.Subheader>
            <Dropdown as='h4' text={'Manage Add-ons'}>
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item as={Link} to={`/addon/new`} icon='plus' text='Add New Add-on' />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Subheader>
        </Header>

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
