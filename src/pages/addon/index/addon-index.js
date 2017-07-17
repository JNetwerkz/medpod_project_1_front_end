import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { combineName } from 'custom-function'

const AddonRow = (props) => {
  // M6117(props.doctorData)
  return (
    <li>
      <Link to={`${props.match.url}/${props.addonData._id}`}>
        {props.addonData.name}
      </Link>
    </li>
  )
}

export default class AddonIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addonIndex: []
    }
  }

  render () {
    let AddonRows = this.state.addonIndex.map((item) => {
      return <AddonRow key={item._id} addonData={item} match={this.props.match} />
    })
    return (
      <div>
        <h1>Index</h1>
        {AddonRows}
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/addon`
    })
    .then((res) => {
      console.log('AddonIndex res', res.data)
      this.setState({ addonIndex: res.data })
    })
  }
}
