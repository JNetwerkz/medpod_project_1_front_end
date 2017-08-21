import React from 'react'
import { Link } from 'react-router-dom'

import { Table, Button } from 'semantic-ui-react'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'

import { M6117, combineName } from 'custom-function'

const IndexRow = ({ updating, commissionData, commissionInput, handleInputChange, handleCommissionSubmit }) => {
  const {
    _id,
    invoiceId: { createdAt: invoiceDate, statuses: invoiceStatuses },
    invoiceAmount,
    commissionAmount,
    transactionId,
    transactionId: { patient, receiving_doctor, _id: _transactionId }
  } = commissionData

  const latestInvoiceStatus = invoiceStatuses[invoiceStatuses.length - 1] || '< NEW >'

  const {
    _id: patientId
  } = patient

  const {
    _id: doctorId
  } = receiving_doctor

  const receivingDoctor = combineName(receiving_doctor)
  const receivingPatient = combineName(patient)
  const transactionRecord = M6117(transactionId)
  const momentInvoiceDate = moment(invoiceDate).format('DD MMM YYYY')
  const formattedInvoiceAmount = currencyFormatter.format(invoiceAmount, { code: 'SGD' })

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          <Link to={`/transaction/${_transactionId}`}>
          {transactionRecord}
          </Link>
        </Table.Cell>
        <Table.Cell>Invoice Number Here</Table.Cell>
        <Table.Cell>{momentInvoiceDate}</Table.Cell>
        <Table.Cell>{latestInvoiceStatus}</Table.Cell>
        <Table.Cell>
          <Link to={`/patient/${patientId}`}>
          {receivingPatient}
          </Link>
        </Table.Cell>
        <Table.Cell>
          <Link to={`/doctor/${doctorId}`}>
          {receivingDoctor}
          </Link>
        </Table.Cell>
        <Table.Cell>{formattedInvoiceAmount}</Table.Cell>
        <Table.Cell className='table-cell--rel'>
          <input
            placeholder='Amount'
            className='table-cell__input'
            type='number'
            name={_id}
            value={commissionInput}
            onChange={handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          {/* <Button onClick={(event) => props.addonHandler(event, 'remove', props.transaction, props.index)}>Delete</Button> */}
          {/* <Button
            fluid
            negative
            icon='delete'
            onClick={(event) => props.addonHandler(event, 'remove', props.transaction, props.index)} /> */}
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
