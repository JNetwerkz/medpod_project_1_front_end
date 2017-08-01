import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container, Table } from 'semantic-ui-react'

import axios from 'axios'

const InvoiceRow = (props) => {
  // M6117(props.transactionData)
  return (
    <li>
      <Link to={`${props.match.url}/${props.invoiceData._id}`}>
        {`${props.invoiceData._id}  ${props.invoiceData['invoicing_doctor']['first name'] || 'No Name'}`}
      </Link>
    </li>
  )
}

export default class InvoiceIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoiceIndex: []
    }
  }

  render () {
    let InvoiceRows = this.state.invoiceIndex.map((item) => {
      return <InvoiceRow key={item._id} invoiceData={item} match={this.props.match} />
    })
    return (
      <Container>
        <h1>Index</h1>
        {InvoiceRows}
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice`
    })
    .then((res) => {
      console.log('InvoiceIndex res', res.data)
      this.setState({ invoiceIndex: res.data })
    })
  }
}
