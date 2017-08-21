import React from 'react'

import { Table, Image } from 'semantic-ui-react'

import * as currencyFormatter from 'currency-formatter'
import moment from 'moment'

import { combineName } from 'custom-function'
import InvoiceItem from './invoice-print/invoice-item'

const ViewTemplate = ({ invoicing_doctor, transactions, _id, createdAt }) => {
  // const {
  //   invoicing_doctor,
  //   transactions,
  //   _id
  // } = props.invoiceShow
//   "associationAddress_country" : "Singapore",
// "associationAddress_postalcode" : "560560",
// "associationAddress_street" : "Novena Street 10",
// "associationAddress_unit" : "10",
// "associationEmail" : "admin@novenacancercentre.com",
// "associationName" : "Novena Cancer Centre",
// "associationPhoneNumber" : "1234 5678"
  const {
    associationAddress_country,
    associationAddress_postalcode,
    associationAddress_street,
    associationAddress_unit,
    associationEmail,
    associationName,
    associationPhoneNumber
  } = invoicing_doctor

  const momentCreatedAt = moment(createdAt).format('DD MMM YYYY')

  const _associationName = associationName ? `${associationName + ' '}` : ''
  const _associationAddress_unit = associationAddress_unit ? `${associationAddress_unit + ' '}` : ''
  const _associationAddress_street = associationAddress_street ? `${associationAddress_street + ' '}` : ''
  const _associationAddress_postalcode = associationAddress_postalcode ? `${associationAddress_postalcode + ' '}` : ''
  const _associationAddress_country = associationAddress_country ? `${associationAddress_country + ' '}` : ''

  let grandTotalAmount = 0

  const InvoiceItems = transactions.map((item, index) => {
    const {
      receivable,
      addons
    } = item

    const receivableTotal = parseFloat(receivable.amount)
    console.log(receivableTotal)
    const addOnTotal = addons.reduce((acc, val) => {
      if (val.amount === '') return acc
      acc = acc + parseFloat(val.amount)
      return acc
    }, 0)
    console.log(addOnTotal)

    grandTotalAmount = grandTotalAmount + receivableTotal + addOnTotal

    return (
      <InvoiceItem
        key={item.transaction._id}
        {...item}
      />
    )
  })

  grandTotalAmount = currencyFormatter.format(grandTotalAmount, { code: 'SGD' })
  return (
    <page className='A4'>
      <div className='grid grid__invoice'>
        <section className='grid__invoice-header'>
          <Image src='https://s3-ap-southeast-1.amazonaws.com/medipod.1/Medipod+Logo.jpg' size='small' />
          <h4>
            TAX INVOICE
          </h4>
        </section>

        <section className='grid__invoice-topleft flex flex--column'>
          <p>
            {`Dr. ${combineName(invoicing_doctor)}`}
          </p>
          <div>
            {`Dr. ${combineName(invoicing_doctor)}`}
          </div>
          <div>
            {_associationName}
          </div>
          <div>
            {_associationAddress_unit}{_associationAddress_street}
          </div>
          <div>
            {_associationAddress_country}{_associationAddress_postalcode}
          </div>
        </section>

        <section className='grid__invoice-topright flex flex--column'>
          <div>
            Invoice Number: {`${_id}`}
          </div>
          <div>
              Date: {momentCreatedAt}
          </div>
        </section>
        <section className='grid__invoice-mid'>
          <h4>SERVICE DESCRIPTION</h4>
          <Table striped compact size='small' basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Invoice No.</Table.HeaderCell>
                <Table.HeaderCell>Invoice Date</Table.HeaderCell>
                <Table.HeaderCell>Patient</Table.HeaderCell>
                <Table.HeaderCell>Item Name</Table.HeaderCell>
                <Table.HeaderCell>Amount (SGD)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {InvoiceItems}
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </section>
        {/* <section className='grid__invoice-bottom'>
          <p>Medipod</p>
        </section> */}
      </div>
      <section className='fixed__invoice-bottom'>
        <p>Medipod Private Limited | address 1 | address 2 | address 3 | phone number | fax </p>
      </section>
    </page>
  )
}

export default ViewTemplate
