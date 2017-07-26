import React from 'react'
import { Link } from 'react-router-dom'

import { Table, Header, Checkbox, List } from 'semantic-ui-react'
import * as currencyFormatter from 'currency-formatter'

import { M6117, combineName } from 'custom-function'

const TableRow = (props) => {
  const { item } = props
  const transactionAmount = currencyFormatter.format(item['transaction amount'], { code: 'SGD' })
  return (
          <Table.Row>
            <Table.Cell>
              <Link to={`/transaction/${item._id}`}>{`${M6117(item)}`}</Link>
            </Table.Cell>
            <Table.Cell singleLine>
              {`${combineName(item.patient)}`}
            </Table.Cell>
            <Table.Cell textAlign='right'>
              {transactionAmount}
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                name={item._id}
                onChange={(event, data) => props.handleTransactionCheckboxChange(event, data)} checked={props.checkedTransaction[item._id].checked} />
            </Table.Cell>
          </Table.Row>
  )
}

export default TableRow
