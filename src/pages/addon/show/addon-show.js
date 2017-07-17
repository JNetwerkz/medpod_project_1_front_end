import React, { Component } from 'react'

import axios from 'axios'

import { combineName } from 'custom-function'

export default class AddonShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addonShow: {}
    }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Addon Show</h1>
        <p>{this.state.addonShow.name}</p>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/addon/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('AddonShow res', res.data)
      this.setState({ addonShow: res.data })
    })
    .catch((err) => console.error(err))
  }
}
