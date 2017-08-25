import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import { Container, Header, Icon, Dropdown } from 'semantic-ui-react'

import InvoiceNew from './new/invoice-new'
import InvoiceShow from './show/invoice-show'
import InvoiceIndex from './index/invoice-index'

export default class InvoiceMain extends Component {
  render () {
    return (
      <Container fluid>
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='wordpress forms' />
            <Header.Content>
                Invoices
            </Header.Content>
          </Link>
          <Header.Subheader>
            <Dropdown as='h4' text={'Manage Invoices'}>
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item as={Link} to={`/invoice/new`} icon='plus' text='Add New Invoice' />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Subheader>
        </Header>

        <Switch>
          <Route
            render={(props) => <InvoiceNew {...props} />}
            path={`${this.props.match.url}/new`}
          />
          <Route
            render={(props) => <InvoiceShow {...props} />}
            path={`${this.props.match.url}/:id`}
          />
          <Route
            render={(props) => <InvoiceIndex {...props} />}
            path={`${this.props.match.url}`}
          />
        </Switch>
      </Container>
    )
  }
}
