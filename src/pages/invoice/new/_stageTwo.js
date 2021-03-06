import React from 'react'

import { Container, Button, Segment, Header, Divider } from 'semantic-ui-react'

import TableRow from './_stageTwo-tableRow'
import GrandTotal from './_stageTwo-grandTotal'
import ErrorMessage from 'partial/error'

import { M6117, combineName } from 'custom-function'

export default (props) => {
  const {
    selectedTransaction,
    selectedAddon,
    errors
  } = props

  const TableRows = Object.values(selectedTransaction).map((item) => {
    let addonForTransaction =
      selectedAddon[item.transaction]
      ? selectedAddon[item.transaction]
      : []

    return (
      <Container fluid key={item.transaction}>
        <Header as='h3' attached='top' block>
          {`${M6117(item.data)}`} | {`${combineName(item.data.patient)}`} | {`Dr. ${combineName(item.data.receiving_doctor)}`}
        </Header>
        <Segment attached>
          <TableRow {...item}
            onChangeHandler={props.handleStageTwoAmtPercentChange}
            addonHandler={props.handleStageTwoAddonMethod}
            addonSelection={props.addonSelection}
            addonForTransaction={addonForTransaction}
          />
        </Segment>
        <Divider hidden />
      </Container>
    )
  })

  return (
    <Container fluid>
      <form onSubmit={props.handleStageTwoSubmit}>
        {TableRows}
        <section>
          <Segment.Group>
            <ErrorMessage errors={errors} />
            <Segment inverted>
              <Header as='h2' inverted>
                Grand Total
              </Header>
            </Segment>
            <Segment>
              <GrandTotal
                errors={errors}
                selectedAddon={selectedAddon}
                selectedTransaction={selectedTransaction}
              />
            </Segment>
          </Segment.Group>

          <Button type='submit' primary floated='right'>
            Create
          </Button>
        </section>
      </form>
    </Container>
  )
}
