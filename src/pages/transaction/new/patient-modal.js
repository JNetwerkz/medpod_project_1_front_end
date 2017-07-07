import React from 'react'
import Modal from 'react-modal'

import { Button } from 'semantic-ui-react'

const PatientModal = (props) => {
  return (
    <Modal
      isOpen={props.patientModalOpen}
      onRequestClose={() => props.modalMethod('close')}
      contentLabel='Patient Search Modal'>
      <h1>MODAL BOX</h1>
      <Button onClick={
        () => props.modalMethod('close')}>
        Close
      </Button>
    </Modal>
  )
}

export default PatientModal
