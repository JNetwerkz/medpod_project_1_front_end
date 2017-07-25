import React from 'react'

import { Form, Container, Table } from 'semantic-ui-react'

import SetupRow from './_stageTwo-setupRow'
import TableRow from './_stageTwo-tableRow'

const InvoiceStageTwo = (props) => {
  console.log(props)
  const SetupRows = Object.values(props.selectedTransaction).map((item) => {
    console.log('props.selectedAddon[item.transaction]', props.selectedAddon[item.transaction])
    let addonForTransaction = props.selectedAddon[item.transaction] ? props.selectedAddon[item.transaction] : []
    console.log('addonForTransaction', addonForTransaction)
    return <TableRow {...item}
      key={item.transaction}
      onChangeHandler={props.handleStageTwoAmtPercentChange}
      // addonHandler={props.handleStageTwoAddonMethod}
      // addonSelection={props.addonSelection}
      // addonForTransaction={addonForTransaction}
    />
  })

  return (
    <Container fluid>
      <Table color='blue' celled padded selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Transaction Record
            </Table.HeaderCell>
            <Table.HeaderCell>
              Patient Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Transaction Amount
            </Table.HeaderCell>
            <Table.HeaderCell>
              Percentage (%)
            </Table.HeaderCell>
            <Table.HeaderCell>
              Chargeable Amount
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {SetupRows}
        </Table.Body>
      </Table>
      {/* <Form onSubmit={props.handleStageTwoSubmit}> */}

        {/* <Form.Button>Submit</Form.Button> */}
      {/* </Form> */}
    </Container>
  )
}

export default InvoiceStageTwo
