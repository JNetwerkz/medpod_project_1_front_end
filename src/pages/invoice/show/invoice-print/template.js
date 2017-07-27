// var React = require('react')
// var ReactDOM = require('react-dom')

import React from 'react'
// import ReactDOM from 'react-dom'
// var PrintTemplate = require('react-print')
import PrintTemplate from 'react-print'
import '../invoice-show.css'

class MyTemplate extends React.Component {
  render () {
    return (
      <PrintTemplate>
        <page className='A4'>
          <div className='grid grid__invoice'>
            <section className='grid__invoice-topleft'>
              <p>
                hello
              </p>
            </section>
            <section className='grid__invoice-topright'>
              hello
            </section>
            <section className='grid__invoice-mid'>
              hello
            </section>
            <section className='grid__invoice-bottom'>
              hello
            </section>
          </div>
        </page>
      </PrintTemplate>
    )
  }
}

export default MyTemplate
