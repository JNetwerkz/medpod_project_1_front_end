import React from 'react'

import { Header, Button, Table, Divider } from 'semantic-ui-react'

import S3Subheader from 'partial/_subheaders'

export default ({ selectedName, modalMethod, children }) => {
  // console.log(selectedName)
  if (!selectedName) return null
  return <div>
    <Header as='h2'>
      <Header.Content>
        <Header.Subheader>
          Selected
        </Header.Subheader>
        {selectedName}
      </Header.Content>
      <Button floated='right' onClick={() => modalMethod('close')}>Confirm</Button>
    </Header>
    <Header as='h3' dividing color='blue'>
      Basic Information
    </Header>
    <Divider hidden />
    <Table celled striped size='large'>
      <Table.Body>
        {children}
      </Table.Body>
    </Table>
  </div>
}

//
// console.log(selectedAgent)
// const selectedAgentDetails = selectedAgent
// ? [ icPassport, personalPhoneNumber, personalEmail, gender ].map((item, index) => {
//   console.log(item)
//   return <Table.Row key={`${_id}-${index}`}>
//     <Table.Cell>
//       <Header as='h4'>
//         <Header.Content>
//             Lena
//           <Header.Subheader>Human Resources</Header.Subheader>
//         </Header.Content>
//       </Header>
//     </Table.Cell>
//     <Table.Cell>
//         22
//     </Table.Cell>
//   </Table.Row>
// })
// : ''
