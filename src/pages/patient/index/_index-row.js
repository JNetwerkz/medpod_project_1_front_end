import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'
import moment from 'moment'

import { combineName } from 'custom-function'

export default ({ patientData, match }) => {
  const {
    'ic / passport': icPassport,
    personalPhoneNumber,
    personalEmail,
    dob,
    referral_agent,
    gender,
    _id
  } = patientData

  const _dob = dob
  ? moment(dob).format('DD MMM YYYY')
  : ''
  const agentName = combineName(referral_agent)

  return (
    <Table.Row>
      <Table.Cell collapsing textAlign='right'>
        <Link to={`${match.url}/${_id}`}>
          {`${combineName(patientData)}`}
        </Link>
      </Table.Cell>
      <Table.Cell>{icPassport}</Table.Cell>
      <Table.Cell>{personalPhoneNumber}</Table.Cell>
      <Table.Cell>{personalEmail}</Table.Cell>
      <Table.Cell>{gender}</Table.Cell>
      <Table.Cell>{_dob}</Table.Cell>
      <Table.Cell><Link to={`/agent/${referral_agent._id}`}>{agentName}</Link></Table.Cell>
    </Table.Row>
  )
}
