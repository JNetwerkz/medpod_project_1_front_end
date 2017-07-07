import React, { Component } from 'react'

import axios from 'axios'

import { AuthHeader, M6117 } from 'custom-function'

class TransactionShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionShow: {},
      mounted: false
    }
  }
  render () {
    if (!this.state.mounted) return <div>Loading</div>
    return (
      <div>
        <h1>Show Transaction</h1>
        <p>{M6117(this.state.transactionShow)} {this.state.transactionShow.patient}</p>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction/${this.props.match.params.id}`,
      
    })
    .then((res) => {
      console.log('TransactionShow res', res.data)
      this.setState({ transactionShow: res.data, mounted: true })
    })
    .catch((err) => console.error(err))
  }
}

export default TransactionShow
