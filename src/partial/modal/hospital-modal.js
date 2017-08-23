import React from 'react'
import Modal from 'react-modal'

import { Input, Button, List, Header, Icon, Segment, Table } from 'semantic-ui-react'
import ModalSelectedDetails from './_modalSelectedDetails'

const HospitalDetails = (data) => {
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
  const {
    hospitalSearchResult,
    selectedHospital,
    hospitalModalOpen,
    modalMethod
  } = props

  const {
    name,
    nameAbbreviation,
    associationAddress_street,
    associationAddress_unit,
    associationAddress_postalcode,
    associationAddress_country,
    associationPhoneNumber,
    associationEmail
  } = selectedHospital

  const hospitalsList = hospitalSearchResult.map((item) => {
    return (
      <List.Item key={item._id} onClick={(event) => modalMethod('select', event, item)}>
        <List.Content>
          <List.Header>{item.name}</List.Header>
        </List.Content>
      </List.Item>
    )
  })
  console.log(props)

  return (
    <Modal
      isOpen={hospitalModalOpen}
      onRequestClose={() => modalMethod('close')}
      contentLabel='Hospital Search Modal'>
      <div className='grid grid__modalbox'>
        <Header as='h1' dividing className='grid__modalbox-header'>
          <Icon name='hospital' />
          <Header.Content>
              Hospitals
            </Header.Content>
          <Header.Subheader>
            Search and select hospital
          </Header.Subheader>
        </Header>
        <section className='grid__modalbox-searcharea'>
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => modalMethod('change', event)} placeholder='Search Hospital by name or abbreviation..' />
          <Segment basic className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {hospitalsList.length ? hospitalsList : <Header as='h4'>Search results return empty!</Header>}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <ModalSelectedDetails
            selectedName={name}
            modalMethod={modalMethod}
          >
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Name Abbreviation
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {nameAbbreviation}
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
                Unit Number
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {associationAddress_unit}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Block & Street
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {associationAddress_street}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Postal Code
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {associationAddress_postalcode}
                </Header>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing singleLine>
                Country
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>
                  {associationAddress_country}
                </Header>
              </Table.Cell>
            </Table.Row>
          </ModalSelectedDetails>
          {/* <HospitalDetails selectedHospital={selectedHospital} />
          <Button onClick={
            () => modalMethod('close')}>
            Close
          </Button> */}
        </section>
      </div>

    </Modal>
  )
}

export default HospitalModal
