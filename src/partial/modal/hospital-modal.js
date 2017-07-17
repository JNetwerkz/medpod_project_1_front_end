import React from 'react'
import Modal from 'react-modal'

import { Input, Button } from 'semantic-ui-react'

const HospitalDetails = (data) => {
  console.log(data.selectedHospital)
  return (
    <div>
      <h2>Details</h2>
      <ul>
        <li>{data.selectedHospital.name}</li>
      </ul>
    </div>
  )
}

const HospitalModal = (props) => {
  console.log(props)
  const hospitalsList = props.hospitalSearchResult.map((item) => {
    console.log(item)
    return <li onClick={(event) => props.modalMethod('select', event, item)} key={item._id}>{`${item.name}`}</li>
  })
  return (
    <Modal
      isOpen={props.hospitalModalOpen}
      onRequestClose={() => props.modalMethod('close')}
      contentLabel='Hospital Search Modal'>
      <h1>MODAL BOX</h1>
      {hospitalsList}
      <Input autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Hospital..' />
      <HospitalDetails selectedHospital={props.selectedHospital} />
      <Button onClick={
        () => props.modalMethod('close')}>
        Close
      </Button>
    </Modal>
  )
}

export default HospitalModal
