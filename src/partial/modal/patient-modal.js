import React from 'react'
import Modal from 'react-modal'

import { Input, Button } from 'semantic-ui-react'

import { combineName } from 'custom-function'

const PatientDetails = (data) => {
  console.log(data.selectedPatient)
  return (
    <div>
      <h2>Details</h2>
      <ul>
        <li>{combineName(data.selectedPatient)}</li>
      </ul>
    </div>
  )
}

const PatientModal = (props) => {
  console.log(props)
  const patientsList = props.patientSearchResult.map((item) => {
    console.log(item)
    return <li onClick={(event) => props.modalMethod('select', event, item)} key={item._id}>{`${item['first name']} ${item['last name']}`}</li>
  })
  return (
    <Modal
      isOpen={props.patientModalOpen}
      onRequestClose={() => props.modalMethod('close')}
      contentLabel='Patient Search Modal'>
      <h1>MODAL BOX</h1>
      {patientsList}
      <Input autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Patient..' />
      <PatientDetails selectedPatient={props.selectedPatient} />
      <Button onClick={
        () => props.modalMethod('close')}>
        Close
      </Button>
    </Modal>
  )
}

export default PatientModal
