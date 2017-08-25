import React from 'react'
import * as ReactPrint from 'react-print'

import ViewTemplate from './view-template'

import './invoice-show.css'

export default (props) => {
  return (
    <ReactPrint>
      <ViewTemplate {...props} />
    </ReactPrint>
  )
}
