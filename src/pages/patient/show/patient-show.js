import React, { Component } from 'react'

import axios from 'axios'

import { combineName } from 'custom-function'

class PatientShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientShow: {}
    }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Patient Show</h1>
        <p>{combineName(this.state.patientShow)}</p>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('PatientShow res', res.data)
      this.setState({ patientShow: res.data })
    })
    .catch((err) => console.error(err))
  }
}

export default PatientShow
