import React from 'react'
import { Link } from 'react-router-dom'

import { Form, Input, Button, Table } from 'semantic-ui-react'
import * as currencyFormatter from 'currency-formatter'

import AddonRow from './_stageTwo-addonRow'
import { M6117, combineName } from 'custom-function'

const TableRow = (props) => {
  console.log('2 tablerow props', props)
  const {
    data: item,
    transaction,
    receivable: {
      amount: chargeableAmt,
      percentage
    }
  } = props

  console.log(typeof percentage, percentage)

  // const roundedPercentage = Math.ceil(percentage * 100) / 100
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
            <Table.Cell className='table-cell--rel'>
              <input
                className='table-cell__input'
                required
                type='text'
                name={transaction}
                value={percentage}
                onChange={(event) => props.onChangeHandler(event, 'percentage')}
              />
              {/* {percentage} */}
            </Table.Cell>
            <Table.Cell>
              <input
                required
                type='number'
                name={transaction}
                value={chargeableAmt}
                onChange={(event) => props.onChangeHandler(event, 'amount')}
              />
              {/* {chargeableAmt} */}
            </Table.Cell>
          </Table.Row>
  )
}

// const SetupRow = (props) => {
//   const { item } = props
//   const transactionAmount = currencyFormatter.format(item['transaction amount'], { code: 'SGD' })
//   return (
//
//     <div>
//       <Form.Group inline>
//         <Form.Field>
//           <label>{M6117(props.data)}</label>
//           <Input label='Base Amount' readOnly defaultValue={`$${props.data['transaction amount']}`} />
//         </Form.Field>
//         <Form.Field>
//           <Input
//             required
//             icon='percent'
//             type='number'
//             name={props.transaction}
//             value={props.receivable.percentage}
//             onChange={(event) => props.onChangeHandler(event, 'percentage')} />
//         </Form.Field>
//         <Form.Field>
//           <Input
//             required
//             label='Chargeable'
//             type='number'
//             name={props.transaction}
//             value={props.receivable.amount}
//             onChange={(event) => props.onChangeHandler(event, 'amount')} />
//         </Form.Field>
//       </Form.Group>
//       {AddonRows}
//       <Button onClick={(event) => props.addonHandler(event, 'add', props.transaction)}>Add Addon</Button>
//     </div>
//   )
// }
export default TableRow
