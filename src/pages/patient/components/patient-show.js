import React from 'react'

const PatientShow = (props) => {
  console.log(props)
  return (
    <div>
      <h1>Patient Show</h1>
      <pre>
        {props.patientData}
      </pre>
    </div>
  )
}

export default PatientShow
