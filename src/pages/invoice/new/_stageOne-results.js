import React from 'react'
import { Link } from 'react-router-dom'

import { Segment, Header, Table, Container, Button, Popup } from 'semantic-ui-react'

import TableRow from './_stageOne-tableRow'

export default (props) => {
  const transactionList = props.transactionSearchResult.map((item) => {
    return (
      <TableRow
        {...props}
        key={item._id}
        item={item}
      />
    )
  })
  if (!transactionList.length) {
    return (
      <Segment className='grid__invoice-new-results'>
        <Header as='h4'>
          Search results return empty!
        </Header>
      </Segment>
    )
  }
  return (
    <Container fluid className='grid__invoice-new-results'>
      <Table color='blue' celled padded selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Transaction Record
            </Table.HeaderCell>
            <Table.HeaderCell>
              Patient Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Amount
            </Table.HeaderCell>
            <Table.HeaderCell>
              Select
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactionList}
        </Table.Body>
      </Table>
      <Popup
        trigger={
          <Button primary as={Link} to={`${props.match.url}/setup_invoice_amount`} floated='right'>Confirm</Button>
        }
        content='Next: Setup invoice amount'
        position='left center'
      />
    </Container>
  )
}
