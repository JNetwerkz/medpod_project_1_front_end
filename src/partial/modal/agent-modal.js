import React from 'react'
import Modal from 'react-modal'

import { Input, Button, Header, Icon, List, Segment } from 'semantic-ui-react'

import { combineName } from 'custom-function'

const AgentDetails = (data) => {
  return (
    <div>
      <h2>Details</h2>
      <ul>
        <li>{combineName(data.selectedAgent)}</li>
      </ul>
    </div>
  )
}

const AgentModal = (props) => {
  const agentsList = props.agentSearchResult.map((item) => {
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
      isOpen={props.agentModalOpen}
      onRequestClose={() => props.modalMethod('close')}
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
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Agent..' />
          <Segment className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {agentsList.length ? agentsList : <Header as='h4'>Search results return empty!</Header>}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <AgentDetails selectedAgent={props.selectedAgent} />
          <Button onClick={
            () => props.modalMethod('close')}>
            Close
          </Button>
        </section>
      </div>
    </Modal>
  )
}

export default AgentModal
