import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Breadcrumb } from 'semantic-ui-react'

const customStyle = {
  color: 'black',
  fontStyle: 'oblique',
  textTransform: 'uppercase'
}

class InvoiceNav extends Component {
  render () {
    return (
      <Breadcrumb size='large'>
        <Breadcrumb.Section exact activeStyle={customStyle} as={NavLink} to={`${this.props.match.url}`}>Select Transactions</Breadcrumb.Section>

        <Breadcrumb.Divider icon='right angle' />
        {
            !this.props.transactionSearchResult.length
            ? '..'
            : <div className='block--inline'>
              <Breadcrumb.Section exact activeStyle={customStyle} as={NavLink} to={`${this.props.match.url}/setup_invoice_amount`}>
                  Setup Invoice Amount
                </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
            </div>
          }
      </Breadcrumb>
    )
  }
}

export default InvoiceNav
