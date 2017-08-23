import React from 'react'
import Modal from 'react-modal'

import { Input, Button, Header, Icon, List, Segment, Table } from 'semantic-ui-react'

import { combineName } from 'custom-function'
import ModalSelectedDetails from './_modalSelectedDetails'

const AgentModal = (props) => {
  const {
    agentSearchResult,
    selectedAgent,
    agentModalOpen,
    modalMethod
  } = props

  const {
    gender,
    personalPhoneNumber,
    personalEmail,
    'ic / passport': icPassport
  } = selectedAgent

  const agentsList = agentSearchResult.map((item) => {
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
      isOpen={agentModalOpen}
      onRequestClose={() => modalMethod('close')}
      contentLabel='Agent Search Modal'>
      <div className='grid grid__modalbox'>
        <Header as='h1' dividing className='grid__modalbox-header'>
          <Icon name='spy' />
          <Header.Content>
              Agents
            </Header.Content>
          <Header.Subheader>
            Search and select agent
          </Header.Subheader>
        </Header>
        <section className='grid__modalbox-searcharea'>
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => modalMethod('change', event)} placeholder='Search Agent..' />
          <Segment basic className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {agentsList.length ? agentsList : <Header as='h4'>Search results return empty!</Header>}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <ModalSelectedDetails
            selectedName={combineName(selectedAgent)}
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
          </ModalSelectedDetails>
          {/* <AgentDetails selectedAgent={selectedAgent} /> */}
          {/* <Button onClick={
            () => modalMethod('close')}>
            Close
          </Button> */}
        </section>
      </div>
    </Modal>
  )
}

export default AgentModal
