import React from 'react'
import Modal from 'react-modal'

import { Input, Button, List, Header, Icon, Segment } from 'semantic-ui-react'

import { combineName } from 'custom-function'

const DoctorDetails = (data) => {
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
  const doctorsList = props.doctorSearchResult.map((item) => {
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
      isOpen={props.doctorModalOpen}
      onRequestClose={() => props.modalMethod('close')}
      contentLabel='Doctor Search Modal'>
      <div className='grid grid__modalbox'>
        <Header as='h1' dividing className='grid__modalbox-header'>
            <Icon name='doctor' />
            <Header.Content>
              Doctors
            </Header.Content>
          <Header.Subheader>
            Search and select doctor
          </Header.Subheader>
        </Header>
        <section className='grid__modalbox-searcharea'>
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Doctor..' />
          <Segment className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {doctorsList.length ? doctorsList : <Header as='h4'>Search results return empty!</Header>}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <DoctorDetails selectedDoctor={props.selectedDoctor} />
          <Button onClick={
            () => props.modalMethod('close')}>
            Close
          </Button>
        </section>
      </div>
    </Modal>
  )
}

export default DoctorModal
