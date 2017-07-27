import React from 'react'

import { Table } from 'semantic-ui-react'

import * as currencyFormatter from 'currency-formatter'
import { M6117, combineName } from 'custom-function'

const TableRow = (props) => {
  console.log(props)
  const {
    data,
    receivableTotal,
    addOnTotal,
    subTotal
  } = props

  return (
    <Table.Row>
      <Table.Cell>
        {M6117(data)} | {combineName(data.patient)} | {combineName(data.receiving_doctor)}
      </Table.Cell>
      <Table.Cell>
        {currencyFormatter.format(receivableTotal, { code: 'SGD' })}
      </Table.Cell>
      <Table.Cell>
        {currencyFormatter.format(addOnTotal, { code: 'SGD' })}
      </Table.Cell>
      <Table.Cell width='four'>
        {currencyFormatter.format(subTotal, { code: 'SGD' })}
      </Table.Cell>
    </Table.Row>
  )
}

const GrandTotal = (props) => {
  console.log(props)
  const {
    selectedAddon,
    selectedTransaction
  } = props

  let grandTotalAmount = 0

  const TableRows = Object.values(selectedTransaction).map((item) => {
    const {
      receivable,
      transaction: transactionId,
      data
    } = item
    const receivableTotal = parseFloat(receivable.amount) || 0

    let addonForTransaction =
      selectedAddon[transactionId]
      ? selectedAddon[transactionId]
      : []

    const addOnTotal = addonForTransaction.reduce((acc, val, index) => {
      if (val.amount === '') return acc
      acc = acc + parseFloat(val.amount)
      console.log(acc)
      return acc
    }, 0)

    let subTotal = receivableTotal + addOnTotal

    grandTotalAmount = grandTotalAmount + subTotal

    // let addonForTransaction =
    //   selectedAddon[item.transaction]
    //   ? selectedAddon[item.transaction]
    //   : []

    return (
        <TableRow
          data={data}
          key={item.transaction}
          receivableTotal={receivableTotal}
          addOnTotal={addOnTotal}
          subTotal={subTotal}
        />

      // <Container fluid key={item.transaction}>
      //   <Header as='h3' attached='top' block>
      //     {`${M6117(item.data)}`} | {`${combineName(item.data.patient)}`} | {`Dr. ${combineName(item.data.receiving_doctor)}`}
      //   </Header>
      //   <Segment attached>
      //     <TableRow {...item}
      //       onChangeHandler={props.handleStageTwoAmtPercentChange}
      //       addonHandler={props.handleStageTwoAddonMethod}
      //       addonSelection={props.addonSelection}
      //       addonForTransaction={addonForTransaction}
      //     />
      //   </Segment>
      //   <Divider hidden />
      // </Container>
    )
  })

  return (
    <Table basic='very' selectable striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          Transaction Record
        </Table.HeaderCell>
        <Table.HeaderCell>
          Base Chargeable Amount
        </Table.HeaderCell>
        <Table.HeaderCell>
          All Add-ons Amount
        </Table.HeaderCell>
        <Table.HeaderCell width='four' >
          Sub-Total
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {TableRows}
      <Table.Row>
        <Table.Cell textAlign='right' colSpan='3'>
          Grand Total
        </Table.Cell>
        <Table.Cell width='four'>
          {currencyFormatter.format(grandTotalAmount, { code: 'SGD' })}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  )
}

export default GrandTotal
