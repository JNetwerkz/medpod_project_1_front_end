import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { AuthHeader, M6117 } from 'custom-function'

const TransactionRow = (props) => {
  // M6117(props.transactionData)
  return (
    <li>
      <Link to={`${props.match.url}/${props.transactionData._id}`}>
        {M6117(props.transactionData)}
      </Link>
    </li>
  )
}

class TransactionIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionIndex: []
    }
  }

  render () {
    let TransactionRows = this.state.transactionIndex.map((item) => {
      return <TransactionRow key={item._id} transactionData={item} match={this.props.match} />
    })
    return (
      <div>
        <h1>Index</h1>
        {TransactionRows}
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`
    })
    .then((res) => {
      console.log('TransactionIndex res', res.data)
      this.setState({ transactionIndex: res.data })
    })
  }
}

export default TransactionIndex
