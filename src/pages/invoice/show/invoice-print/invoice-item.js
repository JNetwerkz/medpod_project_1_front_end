import React from 'react'

import { Table } from 'semantic-ui-react'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'

import { combineName } from 'custom-function'

const InvoiceItem = (props) => {
  console.log(props)
  const {
    transaction,
    addons,
    receivable
  } = props

  const {
    'invoice date': invoiceDate,
    'invoice number': invoiceNumber,
    patient

  } = transaction

  const parsedAmount = currencyFormatter.format(receivable.amount, { code: 'SGD' })

  const momentInvoiceDate = moment(invoiceDate).format('DD MMM YYYY')
  const parsedPatientName = combineName(patient)

  const {
    percentage,
    amount
  } = receivable


  const AddonItems = addons.map((addon, index) => {
    return (
      <p key={`${addon.item.name}${index}`}>
        {`Addon - ${addon.item.name}`}
      </p>
    )
  })

  const AddonAmount = addons.map((addon, index) => {
    return (
      <p key={`${addon.amount}${index}`}>
        {`${currencyFormatter.format(addon.amount, { code: 'SGD' })}`}
      </p>
    )
  })

  return (
      <Table.Row>
        <Table.Cell>{invoiceNumber}</Table.Cell>
        <Table.Cell>{momentInvoiceDate}</Table.Cell>
        <Table.Cell>{parsedPatientName}</Table.Cell>
        <Table.Cell>
          Base<br />
          {AddonItems}
        </Table.Cell>
        <Table.Cell textAlign='right'>
          {parsedAmount}<br />
          {AddonAmount}
        </Table.Cell>
      </Table.Row>
  )
}

export default InvoiceItem
