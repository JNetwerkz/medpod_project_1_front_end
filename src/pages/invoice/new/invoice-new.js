import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import axios from 'axios'
import moment from 'moment'

import InvoiceStageOne from './_stageOne'
import InvoiceStageTwo from './_stageTwo'
import InvoiceNav from '../invoice-nav'

export default class InvoiceNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //
      'transaction month': '',
      'transaction year': moment().year(),
      // doctor modal
      doctorModalOpen: false,
      doctorSearchResult: [],
      selectedDoctor: '',
      doctorId: '',
      // transaction search result
      transactionSearchResult: [],
      checkedTransaction: {},
      selectedTransaction: [],

      route: ''
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.doctorModalMethod = this.doctorModalMethod.bind(this)
    this.handleTransactionCheckboxChange = this.handleTransactionCheckboxChange.bind(this)
    this.handleRouteSwitch = this.handleRouteSwitch.bind(this)
  }

  handleSelectChange (event, value, name) {
    this.setState({
      [name]: value
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    console.log(name, value)

    this.setState({
      [name]: value
    })
  }

  handleSearchSubmit (event) {
    event.preventDefault()
    const formData = {
      'transaction month': this.state['transaction month'],
      'transaction year': this.state['transaction year'],
      'receiving_doctor': this.state.doctorId
    }

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction/search`,
      params: formData
    })
    .then((res) => {
      console.log('transaction search data', res.data)

      const checkedTransaction = {}

      const selectedTransaction = res.data.map((item) => {
        let selectedObj = {}
        checkedTransaction[item._id] = {checked: true}
        selectedObj.transaction = item._id
        selectedObj.receivable = { percentage: 0, amount: 0 }
        return selectedObj
      })

      this.setState({
        transactionSearchResult: res.data,
        checkedTransaction: checkedTransaction,
        selectedTransaction: selectedTransaction
      })
    })
    .catch((err) => console.error(err))
  }

  handleTransactionCheckboxChange (event, data) {
    const checkedTransaction = this.state.checkedTransaction

    checkedTransaction[data.name].checked = data.checked

    const selectedTransaction = this.state.transactionSearchResult.filter((item) => {
      if (checkedTransaction[item._id].checked) {
        let selectedObj = {}
        selectedObj.transaction = item._id
        selectedObj.receivable = { percentage: 0, amount: 0 }
        return selectedObj
      }
    })

    console.log(selectedTransaction)

    this.setState({
      checkedTransaction: checkedTransaction,
      selectedTransaction: selectedTransaction
    })
  }

  handleRouteSwitch (route) {
    this.setState({ route: route })
  }

  doctorModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ doctorModalOpen: true })
        break

      case 'close':
        console.log('closing modal')
        this.setState({ doctorModalOpen: false })
        break

      case 'change':
        console.log('searching doctor')
        if (event.currentTarget.value.length >= 2) {
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}/doctor/search`, {
            params: { search: event.currentTarget.value }
          })
          .then((res) => {
            this.setState({ doctorSearchResult: res.data })
          })
          .catch((err) => console.error(err))
        }
        break
      case 'select':
        console.log('select doctor')
        this.setState({
          selectedDoctor: data,
          doctorId: data._id
          // patientModalOpen: false
        })

        // const eventBubbleName = new Event('input', { bubbles: true })
        // this.doctorNameRef.dispatchEvent(eventBubbleName)
        // const eventBubbleId = new Event('input', { bubbles: true })
        // this.doctorIdRef.dispatchEvent(eventBubbleId)

        break
      default:
        break
    }
  }

  render () {
    // if (this.state.route === 'setup') return <Redirect to={this.state.route} />
    // if (this.state.route === 'setup') return <Redirect to={`${this.props.match.url}/${this.state.route}`} />
    return (
      <div>
        <InvoiceNav {...this.props} />
        <Switch>
          <Route
            exact
            render={(props) =>
              <InvoiceStageOne
                {...props}
                // methods
                handleSearchSubmit={this.handleSearchSubmit}
                handleSelectChange={this.handleSelectChange}
                handleInputChange={this.handleInputChange}
                doctorModalMethod={this.doctorModalMethod}
                handleTransactionCheckboxChange={this.handleTransactionCheckboxChange}
                handleRouteSwitch={this.handleRouteSwitch}
                // state as props
                doctorModalOpen={this.state.doctorModalOpen}
                doctorSearchResult={this.state.doctorSearchResult}
                transactionYear={this.state['transaction year']}
                transactionMonth={this.state['transaction month']}
                selectedDoctor={this.state.selectedDoctor}
                doctorId={this.state.doctorId}
                transactionSearchResult={this.state.transactionSearchResult}
                checkedTransaction={this.state.checkedTransaction}
              />}
            path={`${this.props.match.url}`}
          />
          <Route
            exact
            render={(props) =>
              <InvoiceStageTwo
                {...props}
                selectedTransaction={this.state.selectedTransaction}
              />}
            path={`${this.props.match.url}/setup`}
          />
        </Switch>
        {/* <InvoiceStageOne
          handleSubmit={this.handleSubmit}
          handleSelectChange={this.handleSelectChange}
          handleInputChange={this.handleInputChange}
          doctorModalMethod={this.doctorModalMethod}
          transactionYear={this.state['transaction year']}
          transactionMonth={this.state['transaction year']}
          // modal related
          doctorModalOpen={this.state.doctorModalOpen}
          doctorSearchResult={this.state.doctorSearchResult}
          selectedDoctor={this.state.selectedDoctor}
          doctorId={this.state.doctorId}
        /> */}
      </div>
    )
  }
}
