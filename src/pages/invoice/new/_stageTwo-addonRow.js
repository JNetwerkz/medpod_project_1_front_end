import React from 'react'

import { Dropdown, Input, Label } from 'semantic-ui-react'

const AddonRow = (props) => {
  console.log(props)
  return (
    <div>
      <Dropdown
        options={props.addonSelection}
        placeholder='Choose Add-on'
        search
        selection
        fluid
        allowAdditions
        value={props.data.item}
        // onAddItem={this.handleAddition}
        onChange={(event, { value }) => props.addonHandler(event, 'select', props.transaction, props.index, value)}
      />
      <Input
        value={props.data.amount}
        onChange={(event, { value }) => props.addonHandler(event, 'amtInput', props.transaction, props.index, value)}
        labelPosition='right' type='number' placeholder='Amount'>
        <Label basic>$</Label>
        <input />
      </Input>
    </div>
  )
}
export default AddonRow
