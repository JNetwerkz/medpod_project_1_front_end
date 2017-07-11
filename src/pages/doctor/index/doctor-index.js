import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { M6117, combineName } from 'custom-function'

const DoctorRow = (props) => {
  // M6117(props.doctorData)
  return (
    <li>
      <Link to={`${props.match.url}/${props.doctorData._id}`}>
        {`${combineName(props.doctorData)}`}
      </Link>
    </li>
  )
}

class DoctorIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      doctorIndex: []
    }
  }

  render () {
    let DoctorRows = this.state.doctorIndex.map((item) => {
      return <DoctorRow key={item._id} doctorData={item} match={this.props.match} />
    })
    return (
      <div>
        <h1>Index</h1>
        {DoctorRows}
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor`
    })
    .then((res) => {
      console.log('DoctorIndex res', res.data)
      this.setState({ doctorIndex: res.data })
    })
  }
}

export default DoctorIndex
