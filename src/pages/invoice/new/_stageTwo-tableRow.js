import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Table, Container, Divider, Header } from 'semantic-ui-react'
import * as currencyFormatter from 'currency-formatter'

import AddonRow from './_stageTwo-addonRow'
import { M6117, combineName } from 'custom-function'

export default (props) => {
  const {
    data: item,
    transaction,
    receivable: {
      amount: transactionChargeableAmt,
      percentage
    },
    addonForTransaction
  } = props

  const transactionAmount = currencyFormatter.format(item['transaction amount'], { code: 'SGD' })

  const addonChargeableAmt = addonForTransaction.reduce((acc, val, index) => {
    if (val.amount === '') return acc
    acc = acc + parseFloat(val.amount)
    return acc
  }, 0)

  const total = parseFloat(transactionChargeableAmt) + addonChargeableAmt

  const AddonRows = addonForTransaction.map((addon, index) => {
    return (
      <AddonRow
        index={index}
        key={`${props.transaction}-${index}`}
        transaction={props.transaction}
        addonSelection={props.addonSelection}
        addonHandler={props.addonHandler}
        data={addon}
      />
    )
  })

  return (
    <Container fluid>
      <section>
        <Header as='h4' color='grey'>
          INVOICE / TRANSACTION FROM HOSPITAL
        </Header>
        <Table basic='very' selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Transaction Record </Table.HeaderCell>
              <Table.HeaderCell> Patient Name </Table.HeaderCell>
              <Table.HeaderCell> Procedure Name </Table.HeaderCell>
              <Table.HeaderCell> Transaction Amount </Table.HeaderCell>
              <Table.HeaderCell> Percentage (%) </Table.HeaderCell>
              <Table.HeaderCell width='four' > Chargeable Amount </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Link to={`/transaction/${item._id}`}>{`${M6117(item)}`}</Link>
              </Table.Cell>
              <Table.Cell singleLine>
                {`${combineName(item.patient)}`}
              </Table.Cell>
              <Table.Cell>
                {item.procedureName}
              </Table.Cell>
              <Table.Cell>
                {transactionAmount}
              </Table.Cell>
              <Table.Cell className='table-cell--rel'>
                <input
                  placeholder='Percentage'
                  className='table-cell__input'
                  // required
                  type='number'
                  name={transaction}
                  value={percentage}
                  onChange={(event) => props.onChangeHandler(event, 'percentage')}
                />
              </Table.Cell>
              <Table.Cell className='table-cell--rel'>
                <input
                  placeholder='Amount'
                  className='table-cell__input'
                  // required
                  type='number'
                  name={transaction}
                  value={transactionChargeableAmt}
                  onChange={(event) => props.onChangeHandler(event, 'amount')}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>
      <Divider section />
      <section>
        <section>
          <Button
            floated='right'
            positive
            type='button'
            onClick={(event) => props.addonHandler(event, 'add', props.transaction)}>
            Insert Add-on
          </Button>
        </section>
        <Divider hidden section clearing />
        {
          !addonForTransaction.length
          ? ''
          : <section>
            <Header as='h4' color='grey'>
                ADD-ONS
              </Header>
            <Table basic='very' selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell
                      >
                    Add-on
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    width='four'
                    >
                    Chargeable Amount
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {AddonRows}
              </Table.Body>
            </Table>
          </section>
        }
      </section>
      <Divider hidden section clearing />
      <section>
        <Header as='h4' color='grey'>
        SUBTOTAL
      </Header>
        <Table basic='very' selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell> Item </Table.HeaderCell>
              <Table.HeaderCell width='four' > Sub-Total </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell />
              <Table.Cell> Basic Charges </Table.Cell>
              <Table.Cell> {transactionChargeableAmt || 0} </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell />
              <Table.Cell> Add-ons </Table.Cell>
              <Table.Cell> {addonChargeableAmt} </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell />
              <Table.Cell textAlign='right'> Total </Table.Cell>
              <Table.Cell> {currencyFormatter.format(total, { code: 'SGD' })} </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>
    </Container>
  )
}
