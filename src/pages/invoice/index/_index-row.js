import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'

import { combineName } from 'custom-function'

const IndexRow = ({ invoiceData, match }) => {
  const {
    createdAt,
    invoicing_doctor: invoicingDoctor,
    _id
  } = invoiceData

  const parsedCreatedAt = moment(createdAt).format('DD MMM YYYY')

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          <Link to={`${match.url}/${_id}`}>
          {_id}
          </Link>
        </Table.Cell>
        <Table.Cell>{parsedCreatedAt}</Table.Cell>
        <Table.Cell>
          <Link to={`/doctor/${invoicingDoctor._id}`}>
            {combineName(invoicingDoctor)}
          </Link>
        </Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
