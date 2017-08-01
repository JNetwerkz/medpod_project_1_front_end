import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'

import { M6117, combineName } from 'custom-function'

const IndexRow = ({ transactionData, match }) => {
  const {
    'invoice number': invoiceNumber,
    'invoice date': invoiceDate,
    'transaction amount': transactionAmount,
    receiving_doctor,
    patient,
    _id
  } = transactionData

  const receivingDoctor = combineName(receiving_doctor)
  const receivingPatient = combineName(patient)
  const transactionRecord = M6117(transactionData)
  const momentInvoiceDate = moment(invoiceDate).format('DD MMM YYYY')
  const formattedTransactionAmount = currencyFormatter.format(transactionAmount, { code: 'SGD' })

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          <Link to={`${match.url}/${_id}`}>
          {transactionRecord}
          </Link>
        </Table.Cell>
        <Table.Cell>{invoiceNumber}</Table.Cell>
        <Table.Cell>{momentInvoiceDate}</Table.Cell>
        <Table.Cell>{receivingPatient}</Table.Cell>
        <Table.Cell>{receivingDoctor}</Table.Cell>
        <Table.Cell>{formattedTransactionAmount}</Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
