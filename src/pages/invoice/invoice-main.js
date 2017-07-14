import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import InvoiceNew from './new/invoice-new'
import InvoiceShow from './show/invoice-show'
import InvoiceNav from './invoice-nav'
// import TransactionShow from './show/transaction-show'
// import TransactionIndex from './index/transaction-index'

export default class InvoiceMain extends Component {
  render () {
    return (
      <Container fluid>
        <h1>Invoice</h1>
        <Switch>
          <Route
            render={(props) => <InvoiceNew {...props} />}
            path={`${this.props.match.url}/new`}
          />
          <Route
            render={(props) => <InvoiceShow {...props} />}
            path={`${this.props.match.url}/show`}
          />
          {/* <Route
            render={(props) => <TransactionShow {...props} />}
            path={`${this.props.match.url}/:id`}
          />
          <Route
            render={(props) => <TransactionIndex {...props} />}
            path={`${this.props.match.url}`}
          /> */}
        </Switch>
      </Container>
    )
  }
}
