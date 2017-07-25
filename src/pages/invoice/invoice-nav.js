import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Container, Breadcrumb } from 'semantic-ui-react'

const customStyle = {
  color: 'black',
  fontStyle: 'oblique',
  textTransform: 'uppercase'
}

class InvoiceNav extends Component {
  render () {
    console.log('invoice nav props', this.props)
    return (
        <Breadcrumb size='large'>
          <Breadcrumb.Section exact activeStyle={customStyle} as={NavLink} to={`${this.props.match.url}`}>Select Transactions</Breadcrumb.Section>

          <Breadcrumb.Divider icon='right angle' />

          {
            !this.props.transactionSearchResult.length
            ? '..'
            : <div className='block--inline'>
                <Breadcrumb.Section exact activeStyle={customStyle} as={NavLink} to={`${this.props.match.url}/setup`}>
                  Setup Invoice Amount
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
              </div>
          }

        </Breadcrumb>
      // <Container fluid>
      //   <li>
      //     <NavLink activeStyle={{fontWeight: 'bold', color: 'blue'}} to={`${this.props.match.url}`}>Select Transactions</NavLink>
      //   </li>
      //   <li>
      //     <NavLink activeStyle={{fontWeight: 'bold', color: 'blue'}} to={`${this.props.match.url}/setup`}>Modify Percentage</NavLink>
      //   </li>
      // </Container>
    )
  }
}

export default InvoiceNav
