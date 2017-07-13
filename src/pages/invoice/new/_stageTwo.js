import React from 'react'

import SetupRow from './_stageTwo-setupRow'

const InvoiceStageTwo = (props) => {
  console.log(props)
  const SetupRows = Object.values(props.selectedTransaction).map((item) => {
    console.log('item transaction', item.transaction)
    return <SetupRow key={item.transaction} {...item} onChangeHandler={props.handleStageTwoMethod} />
  })

  return (
    <div>
      <h3>Modify Percentage</h3>
      {SetupRows}
    </div>
  )
}

export default InvoiceStageTwo
