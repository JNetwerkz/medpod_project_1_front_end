import React from 'react'
import Modal from 'react-modal'

import { Input, Button, List, Header, Icon, Segment, Table } from 'semantic-ui-react'

import { combineName } from 'custom-function'
import ModalSelectedDetails from './_modalSelectedDetails'

const DoctorModal = (props) => {
  const {
    doctorSearchResult,
    selectedDoctor,
    doctorModalOpen,
    modalMethod
  } = props

  const {
    gender,
    associationName,
    associationPhoneNumber,
    associationEmail,
    hospital
  } = selectedDoctor

  const hospitalName = hospital
  ? hospital.name
  : ''

  const doctorsList = doctorSearchResult.map((item) => {
    return (
      <List.Item key={item._id} onClick={(event) => modalMethod('select', event, item)}>
        <List.Content>
          <List.Header>{combineName(item)}</List.Header>
          {item.gender}
        </List.Content>
      </List.Item>
    )
  })

  return (
    <Modal
      isOpen={doctorModalOpen}
      onRequestClose={() => modalMethod('close')}
      contentLabel='doctor search modal'>
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
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => modalMethod('change', event)} placeholder='Search Doctor..' />
          <Segment basic className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {doctorsList.length ? doctorsList : <Header as='h4'>Search results return empty!</Header>}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <ModalSelectedDetails
            selectedName={combineName(selectedDoctor)}
            modalMethod={modalMethod}
          >
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Department / Institution / Clinic
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {associationName}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Contact Number
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {associationPhoneNumber}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Email
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {associationEmail}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Gender
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {gender}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Hospital
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {hospitalName}
                </Header>
              </Table.Cell>
            </Table.Row>
          </ModalSelectedDetails>
          {/* <DoctorDetails selectedDoctor={selectedDoctor} />
          <Button onClick={
            () => modalMethod('close')}>
            Close
          </Button> */}
        </section>
      </div>
    </Modal>
  )
}

export default DoctorModal
