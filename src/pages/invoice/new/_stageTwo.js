import React from 'react'

import { Form } from 'semantic-ui-react'

import SetupRow from './_stageTwo-setupRow'

const InvoiceStageTwo = (props) => {
  console.log(props)
  const SetupRows = Object.values(props.selectedTransaction).map((item) => {
    console.log('props.selectedAddon[item.transaction]', props.selectedAddon[item.transaction])
    let addonForTransaction = props.selectedAddon[item.transaction] ? props.selectedAddon[item.transaction] : []
    console.log('addonForTransaction', addonForTransaction)
    return <SetupRow {...item}
      key={item.transaction}
      onChangeHandler={props.handleStageTwoAmtPercentChange}
      addonHandler={props.handleStageTwoAddonMethod}
      addonSelection={props.addonSelection}
      addonForTransaction={addonForTransaction}
    />
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
