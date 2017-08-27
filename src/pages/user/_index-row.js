import React from 'react'

import { Table, Button, Popup } from 'semantic-ui-react'
import moment from 'moment'

export default ({ userData, handleUserDelete }) => {
  const { email, lastSignInTime, userType, uid, displayName } = userData
  const momentTime = lastSignInTime
  ? moment(lastSignInTime).format('DD MMM YYYY, h:mma')
  : ''

  return (
    <Table.Row>
      <Table.Cell collapsing textAlign='right'>
        {displayName}
      </Table.Cell>
      <Table.Cell collapsing textAlign='right'>
        {email}
      </Table.Cell>
      <Table.Cell>{momentTime}</Table.Cell>
      <Table.Cell>{userType}</Table.Cell>
      <Table.Cell>
        <Popup
          trigger={<Button type='button' color='red' basic fluid compact>Delete</Button>}
          children={
            <div>
              <p>Confirm delete?</p>
              <Button fluid compact color='red' data-uid={uid} onClick={handleUserDelete}>Yes</Button>
            </div>
            }
          on='click'
          />
      </Table.Cell>
    </Table.Row>
  )
}
