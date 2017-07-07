import React, { Component } from 'react'

import axios from 'axios'

import { AuthHeader } from 'custom-function'

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
        <p>{`${this.state.patientShow['first name']} ${this.state.patientShow['last name']}`}</p>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient/${this.props.match.params.id}`,
      
    })
    .then((res) => {
      console.log('PatientShow res', res.data)
      this.setState({ patientShow: res.data })
    })
    .catch((err) => console.error(err))
  }
}

export default PatientShow
