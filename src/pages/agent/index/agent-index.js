import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { combineName } from 'custom-function'

const AgentRow = (props) => {
  // M6117(props.doctorData)
  return (
    <li>
      <Link to={`${props.match.url}/${props.agentData._id}`}>
        {`${combineName(props.agentData)}`}
      </Link>
    </li>
  )
}

export default class AgentIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agentIndex: []
    }
  }

  render () {
    let AgentRows = this.state.agentIndex.map((item) => {
      return <AgentRow key={item._id} agentData={item} match={this.props.match} />
    })
    return (
      <div>
        <h1>Index</h1>
        {AgentRows}
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent`
    })
    .then((res) => {
      console.log('AgentIndex res', res.data)
      this.setState({ agentIndex: res.data })
    })
  }
}
