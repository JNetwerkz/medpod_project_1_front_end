import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { combineName } from 'custom-function'

const HospitalRow = (props) => {
  // M6117(props.doctorData)
  return (
    <li>
      <Link to={`${props.match.url}/${props.hospitalData._id}`}>
        {props.hospitalData.name}
      </Link>
    </li>
  )
}

export default class HospitalIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hospitalIndex: []
    }
  }

  render () {
    let HospitalRows = this.state.hospitalIndex.map((item) => {
      return <HospitalRow key={item._id} hospitalData={item} match={this.props.match} />
    })
    return (
      <div>
        <h1>Index</h1>
        {HospitalRows}
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital`
    })
    .then((res) => {
      console.log('HospitalIndex res', res.data)
      this.setState({ hospitalIndex: res.data })
    })
  }
}
