import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import TransactionNew from './new/transaction-new'

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
        </Switch>
      </Container>
    )
  }
}

export default TransactionMain
