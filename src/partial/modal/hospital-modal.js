import React from 'react'
import Modal from 'react-modal'

import { Input, Button, List, Header, Icon, Segment } from 'semantic-ui-react'

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
  const hospitalsList = props.hospitalSearchResult.map((item) => {
    return (
      <List.Item key={item._id} onClick={(event) => props.modalMethod('select', event, item)}>
          <List.Content>
            <List.Header>{item.name}</List.Header>
          </List.Content>
      </List.Item>
    )
  })
  console.log(props)

  return (
    <Modal
      isOpen={props.hospitalModalOpen}
      onRequestClose={() => props.modalMethod('close')}
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
          <Input className='grid__modalbox-searchinput' fluid icon='search' autoFocus onChange={(event) => props.modalMethod('change', event)} placeholder='Search Hospital by name or abbreviation..' />
          <Segment className='grid__modalbox-searchresult'>
            <List relaxed divided selection verticalAlign='middle' size='big'>
              {hospitalsList.length ? hospitalsList : <Header as='h4'>Search results return empty!</Header>}
            </List>
          </Segment>
        </section>
        <section className='grid__modalbox-details'>
          <HospitalDetails selectedHospital={props.selectedHospital} />
          <Button onClick={
            () => props.modalMethod('close')}>
            Close
          </Button>
        </section>
      </div>

    </Modal>
  )
}

export default HospitalModal
