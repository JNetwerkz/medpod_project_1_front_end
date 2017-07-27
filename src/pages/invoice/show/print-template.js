import React, { Component } from 'react'
import * as ReactPrint from 'react-print'

import ViewTemplate from './view-template'

// import * as PrintTemplate from 'react-print'
import './invoice-show.css'

const PrintTemplate = (props) => {
  return (
    <ReactPrint>
      <ViewTemplate {...props} />
    </ReactPrint>
  )
}

export default PrintTemplate
