import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { Container, Header, Icon, Dropdown } from 'semantic-ui-react'

import PatientIndex from './index/patient-index'
import PatientNew from './new/patient-new'
import PatientShow from './show/patient-show'

export default class PatientMain extends Component {
  render () {
    return (
      <Container>
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='users' />
            <Header.Content>
                Patients
            </Header.Content>
          </Link>
          <Header.Subheader>
            <Dropdown as='h4' text={'Manage Patients'}>
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item as={Link} to={`/patient/new`} icon='plus' text='Add New Patient' />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Subheader>
        </Header>

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
