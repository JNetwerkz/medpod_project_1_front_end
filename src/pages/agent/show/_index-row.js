import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'

import { M6117, combineName } from 'custom-function'

const IndexRow = ({ transactionData }) => {
  const {
    'invoice number': invoiceNumber,
    'invoice date': invoiceDate,
    'transaction amount': transactionAmount,
    receiving_doctor,
    patient,
    _id
  } = transactionData

  const {
    referral_agent,
    _id: patientId
  } = patient

  const {
    _id: doctorId
  } = receiving_doctor

  const {
    _id: referralAgentId
  } = referral_agent

  const receivingDoctor = combineName(receiving_doctor)
  const receivingPatient = combineName(patient)
  const referralAgent = combineName(referral_agent)
  const transactionRecord = M6117(transactionData)
  const momentInvoiceDate = moment(invoiceDate).format('DD MMM YYYY')
  const formattedTransactionAmount = currencyFormatter.format(transactionAmount, { code: 'SGD' })

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          <Link to={`/transaction/${_id}`}>
          {transactionRecord}
          </Link>
        </Table.Cell>
        <Table.Cell>{invoiceNumber}</Table.Cell>
        <Table.Cell>{momentInvoiceDate}</Table.Cell>
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
        <Table.Cell>
          <Link to={`/agent/${referralAgentId}`}>
          {referralAgent}
          </Link>
        </Table.Cell>
        <Table.Cell>{formattedTransactionAmount}</Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
