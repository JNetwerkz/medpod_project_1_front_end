import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth, db, storageKey, firebaseIdToken, userType } from './firebase'

import './App.css'

import axios from 'axios'

// import components
import AuthMain from './pages/auth/auth-main'
import UnauthorisedMain from './pages/auth/unauthorised-main'
import HomeMain from './pages/home/home-main'
import NavMain from 'nav/nav-main'
import PatientMain from './pages/patient/patient-main'
import TransactionMain from './pages/transaction/transaction-main'
import DoctorMain from './pages/doctor/doctor-main'
import HospitalMain from './pages/hospital/hospital-main'
import AddonMain from './pages/addon/addon-main'
import AgentMain from './pages/agent/agent-main'
import InvoiceMain from './pages/invoice/invoice-main'
import PrivateRoute from './private-route'

import TestMain from './pages/test/test-main'

import { AuthHeader } from 'custom-function'

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
        console.log('step 1', window.localStorage.getItem(storageKey))
        user.getIdToken(true)
        .then((token) => {
          window.localStorage.setItem(firebaseIdToken, token)
          console.log('step 2', window.localStorage.getItem(firebaseIdToken))
          return token
        })
        .then((token) => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          return axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}${token}`)
        })
        .then((res) => {
          window.localStorage.setItem(userType, res.data[user.uid])
          console.log('step 3', window.localStorage.getItem(userType))
          return this.setState({
            loading: false
          })
        })
      } else {
        console.log('onAuthStateChanged removing storageKey')
        window.localStorage.removeItem(storageKey)
        window.localStorage.removeItem(firebaseIdToken)
        window.localStorage.removeItem(userType)
        axios.defaults.headers.common['Authorization'] = ''
        return this.setState({
          loading: false
        })
      }
    })
  }
  // componentDidMount () {
  //   auth.onAuthStateChanged(user => {
  //     console.log('onAuthStateChanged user', user)
  //     if (user) {
  //       window.localStorage.setItem(storageKey, user.uid)
  //       console.log('step 1', window.localStorage.getItem(storageKey))
  //       user.getIdToken(true).then((token) => {
  //         window.localStorage.setItem(firebaseIdToken, token)
  //         console.log('step 2', window.localStorage.getItem(firebaseIdToken))
  //         axios
  //         .get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}${token}`)
  //         .then((res) => {
  //           window.localStorage.setItem(userType, res.data[user.uid])
  //               console.log('step 3', window.localStorage.getItem(userType))
  //           axios.defaults.headers.common['Authorization'] = AuthHeader()
  //           this.setState({
  //             loading: false
  //           })
  //         })
  //         .catch((err) => {
  //           console.error(err)
  //         })
  //       })
  //     } else {
  //       console.log('onAuthStateChanged removing storageKey')
  //       window.localStorage.removeItem(storageKey)
  //       window.localStorage.removeItem(firebaseIdToken)
  //       window.localStorage.removeItem(userType)
  //       axios.defaults.headers.common['Authorization'] = ''
  //       this.setState({
  //         loading: false
  //       })
  //     }
  //   })
  // }

  render () {
    if (this.state.loading) return <h1>Loading</h1>
    return (
      <BrowserRouter>
        <div className='App'>
          <header>
            <NavMain />
          </header>
          <button onClick={() => console.log(window.localStorage)}>Print localStorage</button>
          <main>
            <Switch>
              <Route exact path='/test'
                render={(props) => <TestMain {...props} />} />
              <PrivateRoute exact path='/' component={HomeMain} />
              <PrivateRoute path='/patient' component={PatientMain} />
              <PrivateRoute path='/transaction' component={TransactionMain} />
              <PrivateRoute path='/doctor' component={DoctorMain} />
              <PrivateRoute path='/hospital' component={HospitalMain} />
              <PrivateRoute path='/addon' component={AddonMain} />
              <PrivateRoute path='/agent' component={AgentMain} />
              <PrivateRoute path='/invoice' component={InvoiceMain} />
              <Route exact path='/login'
                render={(props) => <AuthMain {...props} />} />
              <Route exact path='/unauthorised'
                render={(props) => <UnauthorisedMain {...props} />} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
