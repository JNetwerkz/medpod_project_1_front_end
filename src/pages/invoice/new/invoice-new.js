import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import axios from 'axios'
import moment from 'moment'

import { Button } from 'semantic-ui-react'

import InvoiceStageOne from './_stageOne'
import InvoiceStageTwo from './_stageTwo'
import InvoiceNav from '../invoice-nav'

export default class InvoiceNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //
      redirectToShow: false,
      redirectTo: '',
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
      selectedTransaction: {},
      // addons
      addonSelection: [],
      selectedAddon: {}
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.doctorModalMethod = this.doctorModalMethod.bind(this)
    this.handleTransactionCheckboxChange = this.handleTransactionCheckboxChange.bind(this)
    this.handleStageTwoAmtPercentChange = this.handleStageTwoAmtPercentChange.bind(this)
    this.handleStageTwoAddonMethod = this.handleStageTwoAddonMethod.bind(this)
    this.handleStageTwoSubmit = this.handleStageTwoSubmit.bind(this)
    this.printingStuff = this.printingStuff.bind(this)
  }

  printingStuff (stuff) {
    console.log(this.state[stuff])
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

      const selectedTransaction = {}
      res.data.forEach((item) => {
        let selectedObj = {}
        checkedTransaction[item._id] = {checked: true}
        selectedObj.transaction = item._id
        selectedObj.data = item
        selectedObj.receivable = { percentage: '', amount: '' }
        selectedTransaction[item._id] = selectedObj
      })

      this.setState({
        transactionSearchResult: res.data,
        checkedTransaction: checkedTransaction,
        selectedTransaction: selectedTransaction
      })
    })
    .catch((err) => console.error(err))
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
          // console.log('searching doctor')
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
          // console.log('select doctor')
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

  handleTransactionCheckboxChange (event, data) {
    const checkedTransaction = this.state.checkedTransaction
    const transactionSearchResult = this.state.transactionSearchResult

    checkedTransaction[data.name].checked = data.checked

    const selectedTransaction = {}

    transactionSearchResult.forEach((item) => {
      if (checkedTransaction[item._id].checked) {
        let selectedObj = {}
        selectedObj.transaction = item._id
        selectedObj.data = item
        selectedObj.receivable = { percentage: '', amount: '' }
        selectedTransaction[item._id] = selectedObj
      }
    })

    this.setState({
      checkedTransaction: checkedTransaction,
      selectedTransaction: selectedTransaction
    })
  }

  handleStageTwoAmtPercentChange (event, type) {
    console.log('value', event.target.value)

    const transactionId = event.target.name
    const selectedTransaction = this.state.selectedTransaction
    const transactionObj = selectedTransaction[transactionId]
    const receivable = transactionObj.receivable
    const baseAmt = this.state.selectedTransaction[transactionId].data['transaction amount']

    const toChange = type === 'percentage' ? 'amount' : 'percentage'

    const input = event.target.value ? parseInt(event.target.value) : ''

    if (!input) {
      receivable[type] = input
      if (toChange === 'percentage') receivable[toChange] = ''
      if (toChange === 'amount') receivable[toChange] = ''
    } else {
      receivable[type] = input
      if (toChange === 'percentage') receivable[toChange] = input / baseAmt * 100
      if (toChange === 'amount') receivable[toChange] = input / 100 * baseAmt
    }
    console.log(this.state.selectedTransaction)

    this.setState({
      selectedTransaction: selectedTransaction
    })
  }

  handleStageTwoAddonMethod (event, type, transactionId, index, value) {
    event.preventDefault()
    let selectedAddon = this.state.selectedAddon
    switch (type) {
      case 'add':
        console.log(transactionId)

        if (Array.isArray(selectedAddon[transactionId])) {
          selectedAddon[transactionId].push({item: '', amount: ''})
        } else {
          selectedAddon[transactionId] = []
          selectedAddon[transactionId].push({item: '', amount: ''})
        }
        console.log('selectedAddon.transactionId', selectedAddon.transactionId)

        this.setState({ selectedAddon })

        break
      case 'select':
        console.log('handleStageTwoAddonMethod select')
        selectedAddon[transactionId][index].item = value

        this.setState({ selectedAddon })
        break
      case 'amtInput':
        console.log('handleStageTwoAddonMethod amtInput')
        selectedAddon[transactionId][index].amount = value

        this.setState({ selectedAddon })
        break
      default:
        break
    }
  }

  handleStageTwoSubmit (event) {
    event.preventDefault()
    const selectedTransaction = this.state.selectedTransaction
    let formData = { transactions: Object.values(selectedTransaction) }
    formData['invoicing_doctor'] = this.state.doctorId

    formData.transactions = formData.transactions.map((item) => {
      const selectedAddon = this.state.selectedAddon
      if (Array.isArray(selectedAddon[item.transaction])) item.addons = selectedAddon[item.transaction]

      return item
    })

    console.log(formData)

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice`,
      data: formData
    })
    .then((res) => {
      console.log(res.data)

      this.setState({
        redirectToShow: true,
        redirectTo: res.data._id
      })
    })
    .catch((err) => console.log(err))
  }

  componentDidMount () {
    axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/addon`)
    .then((res) => {
      console.log(res.data)
      //  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
      const addonSelection = res.data.map((item) => {
        let { _id: key, name: text, _id: value } = item
        return { key, text, value }
      })
      this.setState({ addonSelection })
    })
    .catch((err) => console.log(err))
  }

  render () {
    if (this.state.redirectToShow) {
      console.log('redirectToShow trans new', this.state.redirectTo)
      return <Redirect to={`/invoice/${this.state.redirectTo}`} />
    }
    return (
      <div>
        <InvoiceNav {...this.props} />
        <Button loading={this.state.loading} onClick={() => this.printingStuff('selectedTransaction')}>Print selectedTransaction</Button>
        <Button loading={this.state.loading} onClick={() => this.printingStuff('selectedAddon')}>Print selectedAddon</Button>
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
                handleStageTwoAmtPercentChange={this.handleStageTwoAmtPercentChange}
                handleStageTwoSubmit={this.handleStageTwoSubmit}
                handleStageTwoAddonMethod={this.handleStageTwoAddonMethod}
                selectedTransaction={this.state.selectedTransaction}
                addonSelection={this.state.addonSelection}
                selectedAddon={this.state.selectedAddon}
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
