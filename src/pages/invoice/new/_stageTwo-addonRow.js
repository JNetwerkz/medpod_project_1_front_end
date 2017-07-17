import React from 'react'

import { Dropdown } from 'semantic-ui-react'

const AddonRow = (props) => {
  console.log(props)
  return (
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
  )
}
export default AddonRow
