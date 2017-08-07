import React from 'react'

import { Table, Dropdown } from 'semantic-ui-react'

const IndexRow = ({ userData }) => {
  const { email, lastSignInTime, userType } = userData

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          {email}
        </Table.Cell>
        <Table.Cell>{lastSignInTime}</Table.Cell>
        <Table.Cell>{userType}</Table.Cell>
        <Table.Cell>
          <Dropdown text='Action'>
            <Dropdown.Menu>
              <Dropdown.Item
                // data-id={_id}
                // data-status={status}
                text='Delete'
                // onClick={handleAddOnUpdate}
               />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
