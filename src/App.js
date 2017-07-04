import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth, storageKey } from './firebase'

import './App.css'

// import components
import AuthMain from './pages/auth/auth-main'
import HomeMain from './pages/home/home-main'
import PatientMain from './pages/patient/patient-main'
import PrivateRoute from './private-route'

class App extends Component {
  componentWillMount () {
    console.log('At componentWillMount')
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
        // this.setState({currentUser: user.uid})
      } else {
        window.localStorage.removeItem(storageKey)
        // this.setState({currentUser: null})
      }
    })
  }

  render () {
    console.log(window.localStorage)
    return (
      <BrowserRouter>
        <div className='App'>
          <header />
          <main>
            <Switch>
              <PrivateRoute exact path='/' component={HomeMain} />
              <PrivateRoute path='/patient' component={PatientMain} />
              <Route exact path='/login'
                render={(props) => <AuthMain {...props} />} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
