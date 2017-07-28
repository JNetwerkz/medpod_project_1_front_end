import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'

import { combineName } from 'custom-function'

const IndexRow = ({ agentData, match }) => {
  const {
    'first name': firstName,
    'last name': lastName,
    gender,
    _id
  } = agentData

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          <Link to={`${match.url}/${_id}`}>
          {`${combineName(agentData)}`}
          </Link>
        </Table.Cell>
        <Table.Cell>{firstName}</Table.Cell>
        <Table.Cell>{lastName}</Table.Cell>
        <Table.Cell>{gender}</Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
