import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'

import { combineName } from 'custom-function'

const IndexRow = ({ doctorData, match }) => {
  const {
    _id,
    gender,
    associationName,
    hospital: { _id: hospitalId, name: hospitalName },
    associationPhoneNumber,
    associationEmail
  } = doctorData

  return (
    <Table.Row>
        <Table.Cell collapsing textAlign='right'>
          <Link to={`${match.url}/${_id}`}>
          {`${combineName(doctorData)}`}
          </Link>
        </Table.Cell>
        <Table.Cell>{associationName}</Table.Cell>
        <Table.Cell>{associationPhoneNumber}</Table.Cell>
        <Table.Cell>{associationEmail}</Table.Cell>
        <Table.Cell>{gender}</Table.Cell>
        <Table.Cell><Link to={`/hospital/${hospitalId}`}>{hospitalName}</Link></Table.Cell>
    </Table.Row>
  )
}

export default IndexRow
