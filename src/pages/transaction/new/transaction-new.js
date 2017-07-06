import React, { Component } from 'react'

import * as $ from 'jquery'
import axios from 'axios'

import { Form, Button } from 'semantic-ui-react'

import AuthHeader from 'auth-header'

class TransactionNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionNewForm: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({
      transactionNewForm: $('#transaction_new-form').serializeArray()
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = this.state.transactionNewForm

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      data: formData,
      headers: AuthHeader()
    })
    // .then((res) => {
    //   console.log('new transaction data', res.data)
    //   this.setState({
    //     redirectToShow: true,
    //     redirectTo: res.data_id
    //   })
    // })
    // .catch((err) => console.error(err))
  }

  render () {
    return (
      <Form id='transaction_new-form' onChange={(event) => this.handleChange(event)} onSubmit={(event) => this.handleSubmit(event)}>
        <h2>Enter New Transaction Information</h2>
        <Form.Field>
          <label>Patient</label>
          <input type='text' name='patient' />
        </Form.Field>
        <Form.Field>
          <label>Invoice Date</label>
          <input type='date' name='invoice date' />
        </Form.Field>
        <Form.Field>
          <label>Invoice Number</label>
          <input type='text' name='invoice number' />
        </Form.Field>
        <Form.Field>
          <label>Attending Doctor</label>
          <input type='text' name='attending doctor' />
        </Form.Field>
        <Form.Field>
          <label>Charges to Patient</label>
          <input type='number' name='transaction amount' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default TransactionNew
