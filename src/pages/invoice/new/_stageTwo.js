import React from 'react'

import { Form } from 'semantic-ui-react'

import SetupRow from './_stageTwo-setupRow'

const InvoiceStageTwo = (props) => {
  console.log(props)
  const SetupRows = Object.values(props.selectedTransaction).map((item) => {
    console.log('item transaction', item.transaction)
    return <SetupRow key={item.transaction} {...item} onChangeHandler={props.handleStageTwoAmtPercentChange} />
  })

  return (
    <div>
      <h3>Modify Percentage</h3>
      <Form onSubmit={props.handleStageTwoSubmit}>
        {SetupRows}
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  )
}

export default InvoiceStageTwo
