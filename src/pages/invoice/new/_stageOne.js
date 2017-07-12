import React from 'react'
import { Link } from 'react-router-dom'

import { Form, Checkbox, Button } from 'semantic-ui-react'

import { monthsSelectOption } from 'custom-function'
import DoctorModal from 'partial/modal/doctor-modal'
import CheckboxRow from './_stageOne-checkboxRow'

const InvoiceStageOne = (props) => {
  console.log(props)
  const transactionList = props.transactionSearchResult.map((item) => {
    return (
      <CheckboxRow
        {...props}
        key={item._id}
        item={item}
      />
      // <div>
      //   <Checkbox
      //     key={item._id}
      //     name={item._id}
      //     onChange={(event, data) => props.handleTransactionCheckboxChange(event, data)} checked={props.checkedTransaction[item._id].checked} label={
      //       <label>
      //         <div>
      //           <p>
      //             {item._id} {M6117(item)}
      //           </p>
      //         </div>
      //       </label>
      //   } />
      // </div>
    )
  })
  return (
    <div>
      <Form id='invoice_new-form' onSubmit={(event) => props.handleSearchSubmit(event)}>
        <Form.Group widths='equal'>
          <Form.Select label='Month' options={monthsSelectOption} placeholder='Select Month' onChange={(e, {value}) => props.handleSelectChange(e, value, 'transaction month')} />
          <Form.Input label='Year' placeholder='IE: 2017' name='transaction year' value={props.transactionYear} onChange={props.handleInputChange} />
          <Form.Field>
            <label>Doctor</label>
            <input onClick={() => props.doctorModalMethod('open')} type='text' name='doctorName'
              readOnly
              onChange={() => console.log()}
              // ref={(input) => {
              //   console.log('input', input)
              //   this.doctorNameRef = input
              // }}
              value={`${props.selectedDoctor['first name'] || ''} ${props.selectedDoctor['last name'] || ''}`} />
          </Form.Field>
          <Form.Field>
            <input readOnly
              type='text'
              name='receiving doctor'
              onChange={() => console.log()}
              // ref={(input) => {
              //   console.log('input', input)
              //   this.doctorIdRef = input
              // }}
              value={props.doctorId} />
          </Form.Field>
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
      {transactionList}
      <Link to={`${props.match.url}/setup`}>Next</Link>
      <DoctorModal
        doctorModalOpen={props.doctorModalOpen}
        modalMethod={props.doctorModalMethod}
        doctorSearchResult={props.doctorSearchResult}
        selectedDoctor={props.selectedDoctor} />
    </div>
  )
}

export default InvoiceStageOne
