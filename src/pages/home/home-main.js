import React, { Component } from 'react'
import axios from 'axios'

class HomeMain extends Component {
  render () {
    console.log('homemain props', this.props)
    return (
      <h1>Home Page</h1>
    )
  }

  componentDidMount () {
  }
}

export default HomeMain
