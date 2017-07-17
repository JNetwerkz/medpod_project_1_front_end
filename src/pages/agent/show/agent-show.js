import React, { Component } from 'react'

import axios from 'axios'

import { combineName } from 'custom-function'

export default class AgentShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agentShow: {}
    }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Agent Show</h1>
        <p>{combineName(this.state.agentShow)}</p>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('AgentShow res', res.data)
      this.setState({ AgentShow: res.data })
    })
    .catch((err) => console.error(err))
  }
}
