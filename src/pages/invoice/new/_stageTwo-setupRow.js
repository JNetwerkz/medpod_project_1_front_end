import React from 'react'

import { Form, Input, Button } from 'semantic-ui-react'

import AddonRow from './_stageTwo-addonRow'
import { M6117 } from 'custom-function'

const SetupRow = (props) => {
  console.log(props)
  const AddonRows = props.addonForTransaction.map((addon, index) => {
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
    <div>
      <Form.Group inline>
        <Form.Field>
          <label>{M6117(props.data)}</label>
          <Input label='Base Amount' readOnly defaultValue={`$${props.data['transaction amount']}`} />
        </Form.Field>
        <Form.Field>
          <Input
            required
            icon='percent'
            type='number'
            name={props.transaction}
            value={props.receivable.percentage}
            onChange={(event) => props.onChangeHandler(event, 'percentage')} />
        </Form.Field>
        <Form.Field>
          <Input
            required
            label='Chargeable'
            type='number'
            name={props.transaction}
            value={props.receivable.amount}
            onChange={(event) => props.onChangeHandler(event, 'amount')} />
        </Form.Field>
      </Form.Group>
      {AddonRows}
      <Button onClick={(event) => props.addonHandler(event, 'add', props.transaction)}>Add Addon</Button>
    </div>
  )
}
export default SetupRow
