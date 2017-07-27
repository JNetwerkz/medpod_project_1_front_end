import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { Container, Table, Button } from 'semantic-ui-react'
import * as currencyFormatter from 'currency-formatter'

import { combineName } from 'custom-function'

// import * as PrintTemplate from 'react-print'
import './invoice-show.css'

// import MyTemplate from './invoice-print/template'
// import Template2 from './template-2'
import PrintTemplate from './print-template'
import ViewTemplate from './view-template'

export default class InvoiceShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoiceShow: {},
      loading: true
    }

    this.openPrintDialog = this.openPrintDialog.bind(this)
  }

  openPrintDialog () {
    window.print()
  }
  render () {
    if (this.state.loading) return <h1>Loading</h1>

    return (
      <Container fluid>
        <Button onClick={this.openPrintDialog}>Print Invoice</Button>
        <ViewTemplate {...this.state.invoiceShow} />
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('InvoiceShow res', res.data)
      this.setState({ invoiceShow: res.data, loading: false })
      ReactDOM.render(<PrintTemplate {...this.state.invoiceShow} />, document.getElementById('print-mount'))
    })
    .catch((err) => console.error(err))
  }
}

// ReactDOM.render(<Template2 {...this.state.invoiceShow} />, document.getElementById('print-mount'))
