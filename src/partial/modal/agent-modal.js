import React from 'react'
import Modal from 'react-modal'

import { Input, Button } from 'semantic-ui-react'

import { combineName } from 'custom-function'

const AgentDetails = (data) => {
  console.log(data.selectedAgent)
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
  console.log(props)
  const agentsList = props.agentSearchResult.map((item) => {
    console.log(item)
    return <li onClick={(event) => props.modalMethod('select', event, item)} key={item._id}>{`${item['first name']} ${item['last name']}`}</li>
  })
  return (
    <Modal
      isOpen={props.agentModalOpen}
      onRequestClose={() => props.modalMethod('close')}
      contentLabel='Agent Search Modal'>
      <h1>MODAL BOX</h1>
      {agentsList}
      <Input autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Agent..' />
      <AgentDetails selectedAgent={props.selectedAgent} />
      <Button onClick={
        () => props.modalMethod('close')}>
        Close
      </Button>
    </Modal>
  )
}

export default AgentModal
