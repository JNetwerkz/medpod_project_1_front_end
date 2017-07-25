import React from 'react'

import { Checkbox, List } from 'semantic-ui-react'

import { M6117, combineName } from 'custom-function'

const CheckboxRow = (props) => {
  console.log('checkboxrow props', props)
  const { item } = props
  return (
    <Checkbox
      as={List.Item}
      name={item._id}
      onChange={(event, data) => props.handleTransactionCheckboxChange(event, data)} checked={props.checkedTransaction[item._id].checked} label={
        <label>
          <List.Content>
            <List.Header>
              {`${M6117(item)} | ${combineName(item.patient)} | ${combineName(item.receiving_doctor)}`}
            </List.Header>
            <List.Description />
          </List.Content>
        </label>
          } />
  )
}

export default CheckboxRow
