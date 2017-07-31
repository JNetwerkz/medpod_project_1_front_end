import React from 'react'
import { Link } from 'react-router-dom'

import { Form, Container, Segment, Divider } from 'semantic-ui-react'

import { monthsSelectOption } from 'custom-function'
import DoctorModal from 'partial/modal/doctor-modal'
import SearchResults from './_stageOne-results'

const TransactionIndexSearch = (props) => {
  const {
    handleSelectChange,
    handleInputChange,
    handleSearchSubmit,
    //
    transactionYear,
    // modal
    doctorModalMethod,
    selectedDoctor,
    doctorId,
    doctorModalOpen,
    doctorSearchResult
  } = props
  return (
    <div className='grid grid__invoice-new'>
      <section className='grid__invoice-new-search'>
        <Form id='invoice_new-form' onSubmit={(event) => handleSearchSubmit(event)}>
          <Form.Group widths='equal'>
            <Form.Select
              label='Month'
              options={monthsSelectOption}
              placeholder='Select Month'
              onChange={(e, {value}) => handleSelectChange(e, value, 'transaction month')} />
            <Form.Input
              label='Year'
              placeholder='IE: 2017'
              name='transaction year'
              value={transactionYear}
              onChange={handleInputChange} />
            <Form.Field>
              <label>Doctor</label>
              <input
                onClick={() => doctorModalMethod('open')} type='text' name='doctorName'
                readOnly
                onChange={() => console.log()}
                // ref={(input) => {
                //   console.log('input', input)
                //   this.doctorNameRef = input
                // }}
                value={`${selectedDoctor['first name'] || ''} ${selectedDoctor['last name'] || ''}`} />
            </Form.Field>
            <Form.Field>
              <label>Doctor ID</label>
              <input readOnly
                type='text'
                name='receiving doctor'
                onChange={() => console.log()}
                // ref={(input) => {
                //   console.log('input', input)
                //   this.doctorIdRef = input
                // }}
                value={doctorId} />
            </Form.Field>
            <Form.Field>
              <label>&nbsp;</label>
              <Form.Button type='submit' fluid>
                Search
              </Form.Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </section>
      <Divider section />

      <SearchResults {...props} />

      <DoctorModal
        doctorModalOpen={doctorModalOpen}
        modalMethod={doctorModalMethod}
        doctorSearchResult={doctorSearchResult}
        selectedDoctor={selectedDoctor} />
    </div>
  )
}

export default TransactionIndexSearch
