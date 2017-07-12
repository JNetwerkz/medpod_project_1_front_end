import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

class InvoiceNav extends Component {
  render () {
    return (
      <Container fluid>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'blue'}} to={`${this.props.match.url}`}>Select Transactions</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight: 'bold', color: 'blue'}} to={`${this.props.match.url}/setup`}>Modify Percentage</NavLink>
        </li>
      </Container>
    )
  }
}

export default InvoiceNav
