import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'

import { combineName, invoiceNumberGetter } from 'custom-function'

const IndexRow = ({ invoiceData, match }) => {
  const {
    createdAt,
    grandTotal,
    statuses,
    invoicing_doctor: invoicingDoctor,
    _id
  } = invoiceData

  const parsedCreatedAt = moment(createdAt).format('DD MMM YYYY')
  const invoiceNumber = invoiceNumberGetter(invoiceData)
  const parsedGrandTotal = currencyFormatter.format(grandTotal, { code: 'SGD' })

  const latestStatus = !invoiceData.statuses.length
    ? '< N E W >'
    : invoiceData.statuses[invoiceData.statuses.length - 1].name

  return (
    <Table.Row>
      <Table.Cell collapsing textAlign='right'>
        <Link to={`${match.url}/${_id}`}>
          {invoiceNumber}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link to={`/doctor/${invoicingDoctor._id}`}>
          {combineName(invoicingDoctor)}
        </Link>
      </Table.Cell>
      <Table.Cell>{parsedCreatedAt}</Table.Cell>
      <Table.Cell>{latestStatus}</Table.Cell>
      <Table.Cell>{parsedGrandTotal}</Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
