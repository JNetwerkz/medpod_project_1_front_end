import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import TransactionNew from './new/transaction-new'
import TransactionShow from './show/transaction-show'
import TransactionIndex from './index/transaction-index'

import { AuthHeader } from 'custom-function'

import axios from 'axios'

class TransactionMain extends Component {
  render () {
    return (
      <Container fluid>
        <h1>Transactions</h1>
        <li>
          <Link to={`${this.props.match.url}/new`}>Add Transaction</Link>
        </li>
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
