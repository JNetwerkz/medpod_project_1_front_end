import React from 'react'

import { Dropdown, Button, Table, Icon } from 'semantic-ui-react'

export default (props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Button
          animated
          fluid
          negative
          type='button'
          onClick={(event) => props.addonHandler(event, 'remove', props.transaction, props.index)} >
          <Button.Content hidden>Delete Add-on</Button.Content>
          <Button.Content visible>
            <Icon name='delete' />
          </Button.Content>
        </Button>

      </Table.Cell>
      <Table.Cell
        content={
          <Dropdown
            required
            fluid
            options={props.addonSelection}
            placeholder='Choose Add-on'
            search
            selection
            allowAdditions
            value={props.data.item}
            onAddItem={(event, { value }) => props.addonHandler(event, 'createAddon', props.transaction, props.index, value)}
            onChange={(event, { value }) => props.addonHandler(event, 'select', props.transaction, props.index, value)}
            />
          } />
      <Table.Cell className='table-cell--rel'>
        <input
          required
          className='table-cell__input'
          value={props.data.amount}
          onChange={(event) => props.addonHandler(event, 'amtInput', props.transaction, props.index)}
          type='number'
          placeholder='Amount' />
      </Table.Cell>
    </Table.Row>
  )
}
