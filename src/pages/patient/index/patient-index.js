import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import axios from 'axios'

import AuthHeader from 'auth-header'

const PatientRow = (props) => {
  console.log(props)
  return (
    <li>
      <Link to={`${props.match.url}/${props.patientData._id}`}>
        {`${props.patientData['first name']} ${props.patientData['last name']}`}
      </Link>
    </li>
  )
}

// const PatientIndex = (props) => {
//   console.log(props)
//   let PatientRows = props.patientIndex.map((item) => {
//     return <PatientRow key={item._id} patientData={item} match={props.match} />
//   })
//   return (
//     <div>
//       <h1>Index</h1>
//         <PatientRows />
//     </div>
//   )
// }

class PatientIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientIndex: []
    }
  }

  render () {
    let PatientRows = this.state.patientIndex.map((item) => {
      return <PatientRow key={item._id} patientData={item} match={this.props.match} />
    })
    return (
      <div>
        <h1>Index</h1>
        {PatientRows}
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      headers: AuthHeader()
    })
    .then((res) => {
      console.log('PatientIndex res', res.data)
      this.setState({ patientIndex: res.data })
    })
  }
}

export default PatientIndex
