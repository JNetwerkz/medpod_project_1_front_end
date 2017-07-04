import React from 'react'

import { Form, Button } from 'semantic-ui-react'

const PatientNew = (props) => {
  console.log(props)
  return (
    <Form id='patient_new-form' onChange={(event) => props.handleChange(event)} onSubmit={(event) => props.handleSubmit(event)}>
      <h2>Enter New Patient Information</h2>
      <Form.Field>
        <label>First Name</label>
        <input type='text' name='first name'></input>
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input type='text' name='last name'></input>
      </Form.Field>
      <Form.Field>
        <label>IC / Passport</label>
        <input type='text' name='ic / passport'></input>
      </Form.Field>
      <Form.Field>
        <label>Gender</label>
        <input type='text' name='gender'></input>
      </Form.Field>
      <Form.Field>
        <label>Referral Agent</label>
        <input type='text' name='referral agent'></input>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default PatientNew
