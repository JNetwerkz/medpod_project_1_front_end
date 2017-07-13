import React from 'react'

import { M6117 } from 'custom-function'

import { Form, Input } from 'semantic-ui-react'

const SetupRow = (props) => {
  console.log(props)
  return (
    <div>
      <Form>
        <Form.Group inline>
          <Form.Field>
            <label>{M6117(props.data)}</label>
            <Input label='Base Amount' readOnly defaultValue={`$${props.data['transaction amount']}`} />
          </Form.Field>
          <Form.Field>
            <Input
              icon='percent'
              type='number'
              name={props.transaction}
              value={props.receivable.percentage}
              onChange={(event) => props.onChangeHandler(event, 'percentage')} />
          </Form.Field>
          <Form.Field>
            <Input
              label='Chargeable'
              type='number'
              name={props.transaction}
              value={props.receivable.amount}
              onChange={(event) => props.onChangeHandler(event, 'amount')} />
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  )
}
export default SetupRow
