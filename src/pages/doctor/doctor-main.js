import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Container, Header, Dropdown, Icon } from 'semantic-ui-react'

import DoctorNew from './new/doctor-new'
import DoctorShow from './show/doctor-show'
import DoctorIndex from './index/doctor-index'

class DoctorMain extends Component {
  render () {
    return (
      <Container>
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='doctor' />
            <Header.Content>
                Doctors
            </Header.Content>
          </Link>
          <Header.Subheader>
            <Dropdown as='h4' text={'Manage Doctors'}>
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item as={Link} to={`/doctor/new`} icon='plus' text='Add New Doctor' />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Subheader>
        </Header>

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
          <Route
            path={`${this.props.match.url}/`}
            render={(props) =>
              <DoctorIndex {...props} />
          } />
        </Switch>
      </Container>
    )
  }
}

export default DoctorMain
