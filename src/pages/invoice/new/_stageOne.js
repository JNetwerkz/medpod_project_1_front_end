import React from 'react'

import { Form, Divider } from 'semantic-ui-react'

import { monthsSelectOption } from 'custom-function'
import DoctorModal from 'partial/modal/doctor-modal'
import SearchResults from './_stageOne-results'

export default (props) => {
  return (
    <div className='grid grid__invoice-new'>
      <section className='grid__invoice-new-search'>
        <Form id='invoice_new-form' onSubmit={(event) => props.handleSearchSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Select label='Month' value={props.transactionMonth} options={monthsSelectOption} placeholder='Select Month' onChange={(e, {value}) => props.handleSelectChange(e, value, 'transaction month')} />
            <Form.Input label='Year' placeholder='IE: 2017' name='transaction year' value={props.transactionYear} onChange={props.handleInputChange} />
            <Form.Field>
              <label>Doctor</label>
              <input
                onClick={() => props.doctorModalMethod('open')} type='text' name='doctorName'
                readOnly
                onChange={() => console.log()}
                value={`${props.selectedDoctor['first name'] || ''} ${props.selectedDoctor['last name'] || ''}`} />
            </Form.Field>
            <Form.Field>
              <label>Doctor ID</label>
              <input readOnly
                type='text'
                name='receiving doctor'
                onChange={() => console.log()}
                value={props.doctorId} />
            </Form.Field>
            <Form.Field>
              <label>&nbsp;</label>
              <Form.Button loading={props.searchLoading} type='submit' fluid>
                Search
              </Form.Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </section>
      <Divider section />

      <SearchResults {...props} />

      <DoctorModal
        doctorModalOpen={props.doctorModalOpen}
        modalMethod={props.doctorModalMethod}
        doctorSearchResult={props.doctorSearchResult}
        selectedDoctor={props.selectedDoctor} />
    </div>
  )
}
