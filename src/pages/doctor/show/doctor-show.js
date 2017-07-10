import React, { Component } from 'react'

import axios from 'axios'

import { combineName } from 'custom-function'

class DoctorShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      doctorShow: {}
    }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Doctor Show</h1>
        <p>{combineName(this.state.doctorShow)}</p>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('DoctorShow res', res.data)
      this.setState({ doctorShow: res.data })
    })
    .catch((err) => console.error(err))
  }
}

export default DoctorShow
