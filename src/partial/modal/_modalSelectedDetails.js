import React from 'react'

import { Header, Button, Table, Divider } from 'semantic-ui-react'

export default ({ selectedName, modalMethod, children }) => {
  if (!selectedName) return null
  return <div>
    <Header as='h2'>
      <Header.Content>
        <Header.Subheader>
          Selected
        </Header.Subheader>
        {selectedName}
      </Header.Content>
      <Button floated='right' onClick={() => modalMethod('close')}>Confirm</Button>
    </Header>
    <Header as='h3' dividing color='blue'>
      Basic Information
    </Header>
    <Divider hidden />
    <Table celled striped size='large'>
      <Table.Body>
        {children}
      </Table.Body>
    </Table>
  </div>
}
