import React from 'react'

import { Table } from 'semantic-ui-react'

import * as currencyFormatter from 'currency-formatter'

import { combineName } from 'custom-function'
import InvoiceItem from './invoice-print/invoice-item'

const ViewTemplate = ({ invoicing_doctor, transactions, _id }) => {
  // const {
  //   invoicing_doctor,
  //   transactions,
  //   _id
  // } = props.invoiceShow

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
          <h4>
            TAX INVOICE
          </h4>
        </section>
        <section className='grid__invoice-topleft flex flex--column'>
          <p>
            {`Dr. ${combineName(invoicing_doctor)}`}
          </p>
          <p>
            {`Dr. ${combineName(invoicing_doctor)}`}
            <br />
            476 Ang Mo Kio Ave 10 <br />
            #07-816 Singapore S(560476)
          </p>
        </section>
        <section className='grid__invoice-topright flex flex--column'>
          <p>
            Invoice Number: {`${_id}`}
          </p>
          <p>
            Date:
          </p>
        </section>
        <section className='grid__invoice-mid'>
          <h4>Service Description</h4>
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

              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>13Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>12Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>11Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>10Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>9Granddddddddd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>8Grandddddddd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>7Granddddddd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>6Grandddddd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>5Granddddd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>4Grandddd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>3Granddd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>2Grandd Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>1Grand Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>
              <Table.Row
                textAlign='right'>
                <Table.Cell
                  colSpan='4'>Final Total</Table.Cell>
                <Table.Cell>{grandTotalAmount}</Table.Cell>
              </Table.Row>


            </Table.Body>
          </Table>
        </section>
        <section className='grid__invoice-bottom'>
          <p>Medipod</p>
        </section>

      </div>
    </page>
  )
}

export default ViewTemplate
