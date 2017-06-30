import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css'

// import components
import LoginMain from './home/loginmain'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <header />
          <main>
            <Route exact path='/'
              render={(props) => <LoginMain {...props} />} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
