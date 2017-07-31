import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'

const IndexRow = ({ hospitalData, match }) => {
  const {
    name,
    address,
    _id
  } = hospitalData

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          <Link to={`${match.url}/${_id}`}>
          {name}
          </Link>
        </Table.Cell>
        <Table.Cell>{address}</Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
