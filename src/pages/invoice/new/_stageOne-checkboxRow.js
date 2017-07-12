import React from 'react'

import { Checkbox } from 'semantic-ui-react'

import { M6117 } from 'custom-function'

const CheckboxRow = (props) => {
  console.log(props)
  return (
    <div>
      <Checkbox
        name={props.item._id}
        onChange={(event, data) => props.handleTransactionCheckboxChange(event, data)} checked={props.checkedTransaction[props.item._id].checked} label={
          <label>
            <div>
              <p>
                {props.item._id} {M6117(props.item)}
              </p>
            </div>
          </label>
      } />
    </div>
  )
}

export default CheckboxRow
