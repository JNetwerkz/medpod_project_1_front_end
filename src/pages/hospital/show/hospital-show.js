import React, { Component } from 'react'

import axios from 'axios'

import { combineName } from 'custom-function'

export default class HospitalShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hospitalShow: {}
    }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Hospital Show</h1>
        <p>{this.state.hospitalShow.name}</p>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('HospitalShow res', res.data)
      this.setState({ hospitalShow: res.data })
    })
    .catch((err) => console.error(err))
  }
}
