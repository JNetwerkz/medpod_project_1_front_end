import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { auth, storageKey, firebaseIdToken, userType, userEmail, userName } from './firebase-settings'

import './App.css'

import axios from 'axios'
import { Segment, Loader, Dimmer } from 'semantic-ui-react'

// import components
import AuthMain from './pages/auth/auth-main'
import UnauthorisedMain from './pages/auth/unauthorised-main'
import NavMain from 'nav/nav-main'
import PatientMain from './pages/patient/patient-main'
import TransactionMain from './pages/transaction/transaction-main'
import DoctorMain from './pages/doctor/doctor-main'
import HospitalMain from './pages/hospital/hospital-main'
import AddonMain from './pages/addon/addon-main'
import AgentMain from './pages/agent/agent-main'
import InvoiceMain from './pages/invoice/invoice-main'
import UserMain from './pages/user/user-main'

import PrivateRoute from './private-route'
import RedirectFromLoginRoute from './redirectFromLogin-route'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
        window.localStorage.setItem(userEmail, user.email)
        window.localStorage.setItem(userName, user.displayName)
        user.getIdToken(true)
        .then((token) => {
          window.localStorage.setItem(firebaseIdToken, token)
          return token
        })
        .then((token) => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          return axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/users.json?auth=${token}`)
        })
        .then((res) => {
          window.localStorage.setItem(userType, res.data[user.uid])
          return this.setState({
            loading: false
          })
        })
      } else {
        window.localStorage.removeItem(storageKey)
        window.localStorage.removeItem(firebaseIdToken)
        window.localStorage.removeItem(userType)
        window.localStorage.removeItem(userEmail)
        window.localStorage.removeItem(userName)
        axios.defaults.headers.common['Authorization'] = ''
        return this.setState({
          loading: false
        })
      }
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <Segment style={{height: '100vh'}}>
          <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        </Segment>
      )
    }

    return (
      <div className='App' id='react-no-print'>
        <BrowserRouter>
          <div>
            <Route path='/' render={({ location }) => <NavMain {...location} />} />
            <Segment basic id='app__main' className='flex--grow'>
              <Switch>
                <Route exact path='/' component={() => <Redirect to='/patient' />} />
                <PrivateRoute path='/patient' component={PatientMain} />
                <PrivateRoute path='/transaction' component={TransactionMain} />
                <PrivateRoute path='/doctor' component={DoctorMain} />
                <PrivateRoute path='/hospital' component={HospitalMain} />
                <PrivateRoute path='/addon' component={AddonMain} />
                <PrivateRoute path='/agent' component={AgentMain} />
                <PrivateRoute path='/invoice' component={InvoiceMain} />
                <PrivateRoute path='/user' component={UserMain} />
                <RedirectFromLoginRoute exact path='/login' component={AuthMain} />
                <Route exact path='/unauthorised'
                  render={(props) => <UnauthorisedMain {...props} />} />
              </Switch>
            </Segment>
          </div>
        </BrowserRouter>

      </div>
    )
  }
}

export default App
