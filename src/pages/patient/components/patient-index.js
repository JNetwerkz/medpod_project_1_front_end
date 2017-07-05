import React from 'react'
import { Link, Route } from 'react-router-dom'

const PatientRow = (props) => {
  console.log(props)
  return (
    <li>
      <Link to={`${props.match.url}/${props.patientData._id}`}>
        {`${props.patientData['first name']} ${props.patientData['last name']}`}
      </Link>
    </li>
  )
}

const PatientRows = (props) => {
  return (
    <h1>Rows</h1>
  )
}

const PatientIndex = (props) => {
  console.log(props)
  let PatientRows = props.patientIndex.map((item) => {
    return <PatientRow key={item._id} patientData={item} match={props.match} />
  })
  return (
    <div>
      <h1>Index</h1>
        <PatientRows />
    </div>
  )
}

export default PatientIndex
