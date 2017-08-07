import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { auth, storageKey, firebaseIdToken, userType } from './firebase-settings'

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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      sideBarShow: false
    }

    this.showSideBar = this.showSideBar.bind(this)
  }

  showSideBar () {
    this.setState({ sideBarShow: !this.state.sideBarShow })
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
          return axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/users.json?auth=${token}`)
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
    const { sideBarShow } = this.state
    console.log(sideBarShow)

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
          <div className='flex flex--row'>
            {/* <Segment inverted color='black' basic id='app__nav'> */}
              {/* <Menu inverted vertical color='black' id='app__nav'> */}
                {/* <Menu.Item name='account' onClick={this.handleItemClick} />
                <Menu.Item name='settings' onClick={this.handleItemClick} /> */}
                <Route path='/' render={({ location }) => <NavMain {...location} />} />
              {/* </Menu> */}
            {/* </Segment> */}
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
                  <Route exact path='/login'
                  render={(props) => <AuthMain {...props} />} />
                  <Route exact path='/unauthorised'
                  render={(props) => <UnauthorisedMain {...props} />} />
                </Switch>
            </Segment>

          </div>
          {/* <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='uncover' width='thin' visible={sideBarShow} vertical inverted>
              <Route path='/' render={({ location }) => <NavMain {...location} />} />
            </Sidebar>

            <Sidebar.Pusher>
              <div className='flex flex--row'>
                <Segment basic className='flex__menu-button flex--column' id='app__leftcolumn'>
                  <section>
                    <Button icon='sidebar' onClick={this.showSideBar} />
                  </section>

                  <section>
                    <Dropdown icon='filter' floating button className='icon'>
                      <Dropdown.Menu>
                        <Dropdown.Header content='New' />
                        <Dropdown.Menu scrolling>
                          <Route path='/' render={() => <Dropdown.Item key={'transaction'} text='Transaction' as={Link} to={`/transaction/new`} />} />
                          <Route path='/' render={() => <Dropdown.Item key={'invoice'} text='Invoice' as={Link} to={`/invoice/new`} />} />
                          <Dropdown.Divider />
                          <Route path='/' render={() => <Dropdown.Item key={'patient'} text='Patient' as={Link} to={`/patient/new`} />} />
                          <Route path='/' render={() => <Dropdown.Item key={'doctor'} text='Doctor' as={Link} to={`/doctor/new`} />} />
                          <Route path='/' render={() => <Dropdown.Item key={'hospital'} text='Hospital' as={Link} to={`/hospital/new`} />} />
                          <Route path='/' render={() => <Dropdown.Item key={'addon'} text='Addon' as={Link} to={`/addon/new`} />} />
                          <Route path='/' render={() => <Dropdown.Item key={'agent'} text='Agent' as={Link} to={`/agent/new`} />} />
                        </Dropdown.Menu>
                      </Dropdown.Menu>
                    </Dropdown>
                  </section>
                </Segment>

                <Segment basic className='flex__maincontent flex--grow' id='app__rightcolumn'>
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
                </Segment>

              </div>
            </Sidebar.Pusher>

          </Sidebar.Pushable> */}
        </BrowserRouter>

        {/* <BrowserRouter>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='uncover' width='thin' visible={sideBarShow} vertical inverted>
              <Route path='/' render={({ location }) => <NavMain {...location} />} />
            </Sidebar>

            <Sidebar.Pusher>
              <div className='flex flex--row'>
                <Segment basic className='flex__menu-button flex--column' id='app__leftcolumn'>
                  <section>
                    <Button icon='sidebar' onClick={this.showSideBar} />
                  </section>

                  <section>
                    <Dropdown icon='filter' floating button className='icon'>
                      <Dropdown.Menu>
                        <Dropdown.Header content='New' />
                        <Dropdown.Menu scrolling>
                            <Route path='/' render={() => <Dropdown.Item key={'transaction'} text='Transaction' as={Link} to={`/transaction/new`} />} />
                            <Route path='/' render={() => <Dropdown.Item key={'invoice'} text='Invoice' as={Link} to={`/invoice/new`} />} />
                            <Dropdown.Divider />
                            <Route path='/' render={() => <Dropdown.Item key={'patient'} text='Patient' as={Link} to={`/patient/new`} />} />
                            <Route path='/' render={() => <Dropdown.Item key={'doctor'} text='Doctor' as={Link} to={`/doctor/new`} />} />
                            <Route path='/' render={() => <Dropdown.Item key={'hospital'} text='Hospital' as={Link} to={`/hospital/new`} />} />
                            <Route path='/' render={() => <Dropdown.Item key={'addon'} text='Addon' as={Link} to={`/addon/new`} />} />
                            <Route path='/' render={() => <Dropdown.Item key={'agent'} text='Agent' as={Link} to={`/agent/new`} />} />
                          </Dropdown.Menu>
                      </Dropdown.Menu>
                    </Dropdown>
                  </section>
                </Segment>

                <Segment basic className='flex__maincontent flex--grow' id='app__rightcolumn'>
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
                </Segment>

              </div>
            </Sidebar.Pusher>

          </Sidebar.Pushable>
        </BrowserRouter>
 */}
      </div>
    )
  }
}

export default App

{ /* <div className='App'>
  <header>
    <Route path='/' render={({ location }) => <NavMain {...location} />} />
  </header>
  <button onClick={() => console.log(window.localStorage)}>Print localStorage</button>
  <main>
    <Icon name='sidebar' size='big' />
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
</div> */ }
