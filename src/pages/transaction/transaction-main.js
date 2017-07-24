import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import { Container, Header, Icon, Dropdown } from 'semantic-ui-react'

import TransactionNew from './new/transaction-new'
import TransactionShow from './show/transaction-show'
import TransactionIndex from './index/transaction-index'

import { AuthHeader } from 'custom-function'

import axios from 'axios'

class TransactionMain extends Component {
  render () {
    return (
      <Container>
        <Header as='h1' dividing>
          <Link to={this.props.match.url}>
            <Icon name='file text outline' />
            <Header.Content>
                Transactions
            </Header.Content>
          </Link>
          <Header.Subheader>
            <Dropdown as='h4' text={'Manage Transactions / Invoice from Hospital'}>
              <Dropdown.Menu>
                <Dropdown.Menu scrolling>
                  <Dropdown.Item as={Link} to={`/transaction/new`} icon='plus' text='Add New Transaction / Invoice' />
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Header.Subheader>
        </Header>
        
        <Switch>
          <Route
            exact
            render={(props) => <TransactionNew {...props} />}
            path={`${this.props.match.url}/new`}
          />
          <Route
            render={(props) => <TransactionShow {...props} />}
            path={`${this.props.match.url}/:id`}
          />
          <Route
            render={(props) => <TransactionIndex {...props} />}
            path={`${this.props.match.url}`}
          />
        </Switch>
      </Container>
    )
  }
}

export default TransactionMain
