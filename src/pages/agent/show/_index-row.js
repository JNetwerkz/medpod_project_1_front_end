import React from 'react'
import { Link } from 'react-router-dom'

import { Table, Button } from 'semantic-ui-react'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'

import { M6117, combineName, invoiceNumberGetter } from 'custom-function'

const IndexRow = ({ updating, commissionData, commissionInput, handleInputChange, handleCommissionSubmit }) => {
  const {
    _id,
    invoiceId,
    invoiceAmount,
    transactionId,
    transactionId: { patient, receiving_doctor, _id: _transactionId }
  } = commissionData

  const {
    _id: patientId
  } = patient

  const {
    _id: doctorId
  } = receiving_doctor

  const receivingDoctor = combineName(receiving_doctor)
  const receivingPatient = combineName(patient)
  const transactionRecord = M6117(transactionId)

  const latestInvoiceStatus = invoiceId
  ? !invoiceId.statuses.length
    ? '< N E W >'
    : invoiceId.statuses[invoiceId.statuses.length - 1].name
  : '-'

  const momentInvoiceDate = invoiceId
  ? moment(invoiceId.createdAt).format('DD MMM YYYY')
  : '-'

  const formattedInvoiceAmount = currencyFormatter.format(invoiceAmount, { code: 'SGD' })

  const invoiceNumber = invoiceId
  ? <Link to={`/invoice/${invoiceId._id}`}>{invoiceNumberGetter(invoiceId)}</Link>
  : <Link to='/invoice/new'>Create Invoice</Link>

  return (
    <Table.Row>
      <Table.Cell collapsing textAlign='right'>
        <Link to={`/transaction/${_transactionId}`}>
          {transactionRecord}
        </Link>
      </Table.Cell>
      <Table.Cell collapsing>
        <Link to={`/patient/${patientId}`}>
          {receivingPatient}
        </Link>
      </Table.Cell>
      <Table.Cell collapsing>
        <Link to={`/doctor/${doctorId}`}>
          {receivingDoctor}
        </Link>
      </Table.Cell>
      <Table.Cell collapsing>{invoiceNumber}</Table.Cell>
      <Table.Cell collapsing>{momentInvoiceDate}</Table.Cell>
      <Table.Cell collapsing>{latestInvoiceStatus}</Table.Cell>
      <Table.Cell collapsing>{formattedInvoiceAmount}</Table.Cell>
      <Table.Cell collapsing className='table-cell--rel'>
        <input
          placeholder='Amount'
          className='table-cell__input'
          type='number'
          name={_id}
          value={commissionInput}
          onChange={handleInputChange}
          />
      </Table.Cell>
      <Table.Cell collapsing>
        <Button
          loading={updating}
          fluid
          positive
          type='button'
          name={_id}
          onClick={handleCommissionSubmit}
            >Save</Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
