import React from 'react'

import { Dropdown, Input, Label, Button } from 'semantic-ui-react'

const AddonRow = (props) => {
  console.log(props)
  return (
    <div>
      <Dropdown
        options={props.addonSelection}
        placeholder='Choose Add-on'
        search
        selection
        allowAdditions
        value={props.data.item}
        onAddItem={(event, { value }) => props.addonHandler(event, 'createAddon', props.transaction, props.index, value)}
        onChange={(event, { value }) => props.addonHandler(event, 'select', props.transaction, props.index, value)}
      />
      <Input
        value={props.data.amount}
        onChange={(event, { value }) => props.addonHandler(event, 'amtInput', props.transaction, props.index, value)}
        label={{ basic: true, content: '$' }}
        labelPosition='left' type='number' placeholder='Amount' />
      <Button onClick={(event) => props.addonHandler(event, 'remove', props.transaction, props.index)}>Delete</Button>
    </div>
  )
}
export default AddonRow
