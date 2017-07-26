import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container, Header, Icon, Dropdown } from 'semantic-ui-react'

import HospitalNew from './new/hospital-new'
import HospitalShow from './show/hospital-show'
import HospitalIndex from './index/hospital-index'

export default class HospitalMain extends Component {
  render () {
    return (
      <Container>
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='hospital' />
            <Header.Content>
                Hospitals
            </Header.Content>
          </Link>
          <Header.Subheader>
            <Dropdown as='h4' text={'Manage Hospitals'}>
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item as={Link} to={`/hospital/new`} icon='plus' text='Add New Hospital' />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Subheader>
        </Header>

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
