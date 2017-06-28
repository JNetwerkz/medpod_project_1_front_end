import React, { Component } from 'react'
import './App.css'

// import components
import LoginMain from './home/loginmain'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header></header>
        <main>
          <LoginMain />
        </main>
      </div>
    )
  }
}

export default App
