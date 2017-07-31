import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container, Header, Table, Menu, Icon, Search, Form } from 'semantic-ui-react'

import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

import { AuthHeader, M6117, combineName, monthsSelectOption } from 'custom-function'

import DoctorModal from 'partial/modal/doctor-modal'

// import TransactionIndexSearch from './_index-search'

const TransactionRow = (props) => {
  // M6117(props.transactionData)
  return (
    <li>
      <Link to={`${props.match.url}/${props.transactionData._id}`}>
        {`${M6117(props.transactionData)} ${combineName(props.transactionData.patient)}`}
      </Link>
    </li>
  )
}

class TransactionIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionIndex: [],
      searchInput: '',
      page: '',
      pages: '',
      total: '',
      searchLoading: false,
      //
      doctorModalOpen: false,
      'transaction year': moment().year(),
      'transaction month': '',
      doctorSearchResult: [],
      selectedDoctor: {},
      doctorId: ''
    }
    this.handlePaginate = this.handlePaginate.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.doctorModalMethod = this.doctorModalMethod.bind(this)
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

  handleSearchChange () {
    this.setState({ searchLoading: true })
    const {
      'transaction year': transactionYear,
      'transaction month': transactionMonth,
      doctorId: receiving_doctor
    } = this.state

    const formData = {
      'transaction year': transactionYear,
      'transaction month': transactionMonth,
      receiving_doctor
    }
    const queryString = qs.stringify(formData)

    console.log(queryString)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      params: {
        search: queryString
      }
    })
    .then((res) => {
      console.log('transaction index search', res)
      const {
        docs: transactionIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ transactionIndex, page, pages, total, searchLoading: false })
    })
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
        const eventBubbleName = new Event('input', { bubbles: true })
        this.doctorNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.doctorIdRef.dispatchEvent(eventBubbleId)
        break
      default:
        break
    }
  }

  handlePaginate (event) {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transactionIndex`,
      params: {
        page: parseInt(event.target.dataset.page)
      }
    })
    .then((res) => {
      const {
        docs: transactionIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ transactionIndex, page, pages, total })
    })
  }

  render () {
    const {
      'transaction year': transactionYear,
      'transaction month': transactionMonth,
      selectedDoctor,
      doctorId,
      doctorSearchResult,
      doctorModalOpen
    } = this.state

    const {
      handleSelectChange,
      handleInputChange,
      doctorModalMethod,
      handleSearchChange
    } = this

    return (
      <Container>
        <Form onSubmit={handleSearchChange}>
          <Form.Group widths='equal'>
            <Form.Select
              label='Month'
              options={monthsSelectOption}
              placeholder='Select Month'
              value={transactionMonth}
              onChange={(e, {value}) => handleSelectChange(e, value, 'transaction month')} />
            <Form.Input
              label='Year'
              placeholder='IE: 2017'
              name='transaction year'
              value={transactionYear}
              onChange={handleInputChange} />
            <Form.Field>
              <label>Doctor</label>
              <input
                onClick={() => doctorModalMethod('open')} type='text' name='doctorName'
                readOnly
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.doctorNameRef = input
                }}
                value={`${selectedDoctor['first name'] || ''} ${selectedDoctor['last name'] || ''}`} />
            </Form.Field>
            <Form.Field>
              <label>Doctor ID</label>
              <input readOnly
                type='text'
                name='receiving doctor'
                onChange={() => console.log()}
                ref={(input) => {
                  console.log('input', input)
                  this.doctorIdRef = input
                }}
                value={doctorId} />
            </Form.Field>
            <Form.Field>
              <label>&nbsp;</label>
              <Form.Button type='submit' fluid>
                Search
              </Form.Button>
            </Form.Field>
          </Form.Group>
        </Form>
        <DoctorModal
          doctorModalOpen={doctorModalOpen}
          modalMethod={doctorModalMethod}
          doctorSearchResult={doctorSearchResult}
          selectedDoctor={selectedDoctor} />
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`
    })
    .then((res) => {
      console.log('TransactionIndex res', res.data)
      this.setState({ transactionIndex: res.data })
    })
  }
}

export default TransactionIndex
