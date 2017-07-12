import React from 'react'
import Modal from 'react-modal'

import { Input, Button } from 'semantic-ui-react'

import { combineName } from 'custom-function'

const DoctorDetails = (data) => {
  console.log(data.selectedDoctor)
  return (
    <div>
      <h2>Details</h2>
      <ul>
        <li>{combineName(data.selectedDoctor)}</li>
      </ul>
    </div>
  )
}

const DoctorModal = (props) => {
  console.log(props)
  const doctorsList = props.doctorSearchResult.map((item) => {
    console.log(item)
    return <li onClick={(event) => props.modalMethod('select', event, item)} key={item._id}>{`${item['first name']} ${item['last name']}`}</li>
  })
  return (
    <Modal
      isOpen={props.doctorModalOpen}
      onRequestClose={() => props.modalMethod('close')}
      contentLabel='Doctor Search Modal'>
      <h1>MODAL BOX</h1>
      {doctorsList}
      <Input autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Doctor..' />
      <DoctorDetails selectedDoctor={props.selectedDoctor} />
      <Button onClick={
        () => props.modalMethod('close')}>
        Close
      </Button>
    </Modal>
  )
}

export default DoctorModal
