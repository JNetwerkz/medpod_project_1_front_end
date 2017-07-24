import React from 'react'
import Modal from 'react-modal'

import { Input, Button, Header, Icon, Segment, List } from 'semantic-ui-react'

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
    return (
      <List.Item key={item._id} onClick={(event) => props.modalMethod('select', event, item)}>
          <List.Content>
            <List.Header>{combineName(item)}</List.Header>
            {item.gender}
          </List.Content>
      </List.Item>
    )
  })
  return (
    <Modal
      isOpen={props.patientModalOpen}
      onRequestClose={() => props.modalMethod('close')}
      contentLabel='Patient Search Modal'>
      <div className='grid grid__modalbox'>
        <Header as='h1' dividing className='grid__modalbox-header'>
            <Icon name='users' />
            <Header.Content>
              Patients
            </Header.Content>
          <Header.Subheader>
            Search and select patient
          </Header.Subheader>
        </Header>
        <section className='grid__modalbox-searcharea'>
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Patient..' />
          <Segment className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {patientsList.length ? patientsList : 'Search results return empty!'}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <PatientDetails selectedPatient={props.selectedPatient} />
          <Button onClick={
            () => props.modalMethod('close')}>
            Close
          </Button>
        </section>
      </div>
    </Modal>
  )
}

export default PatientModal
