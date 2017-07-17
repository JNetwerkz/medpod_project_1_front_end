import React, { Component } from 'react'
import axios from 'axios'
import './invoice-show.css'

export default class InvoiceShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoiceShow: {}
    }
  }
  render () {
    return (
      <div>
        <page size='A4' />
        <page size='A4' />
        <page size='A4' />
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('InvoiceShow res', res.data)
      this.setState({ invoiceShow: res.data, mounted: true })
    })
    .catch((err) => console.error(err))
  }
}
