import React from 'react'
import Modal from 'react-modal'

import { Input, Button, Header, Icon, Segment, List, Table } from 'semantic-ui-react'
import moment from 'moment'

import { combineName } from 'custom-function'
import ModalSelectedDetails from './_modalSelectedDetails'

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
  const {
    patientSearchResult,
    selectedPatient,
    patientModalOpen,
    modalMethod
  } = props

  const {
    dob,
    'ic / passport': icPassport,
    gender,
    referral_agent,
    personalPhoneNumber,
    personalEmail
  } = selectedPatient
  const momentDob = moment(dob).format('DD MMM YYYY')
  const patientsList = patientSearchResult.map((item) => {
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
      isOpen={patientModalOpen}
      onRequestClose={() => modalMethod('close')}
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
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => modalMethod('change', event)} placeholder='Search Patient..' />
          <Segment basic className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {patientsList.length ? patientsList : <Header as='h4'>Search results return empty!</Header>}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <ModalSelectedDetails
            selectedName={combineName(selectedPatient)}
            modalMethod={modalMethod}
          >
            <Table.Row>
              <Table.Cell collapsing singleLine>
                IC / Passport
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {icPassport}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Contact Number
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {personalPhoneNumber}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Email
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {personalEmail}
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
                D.O.B
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {momentDob}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Agent In-Charge
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {combineName(referral_agent)}
                </Header>
              </Table.Cell>
            </Table.Row>
          </ModalSelectedDetails>
          {/* <PatientDetails selectedPatient={selectedPatient} />
          <Button onClick={
            () => modalMethod('close')}>
            Close
          </Button> */}
        </section>
      </div>
    </Modal>
  )
}

export default PatientModal
