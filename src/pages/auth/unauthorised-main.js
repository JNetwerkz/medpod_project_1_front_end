import React, { Component } from 'react'

export default class UnauthorisedMain extends Component {
  render () {
    return (
      <div className='flex flex--column flex--jc-center flex--align--center' >
        <div>
          <h1>You are not authorized for this page.</h1>
        </div>
      </div>
    )
  }
}
