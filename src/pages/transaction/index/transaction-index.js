import React, { Component } from 'react'

import { Container, Table, Menu, Icon, Form, Divider } from 'semantic-ui-react'

import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

import { monthsSelectOption } from 'custom-function'

import IndexRow from './_index-row'
import DoctorModal from 'partial/modal/doctor-modal'
import LoadingSmall from 'partial/loading-small'

// import TransactionIndexSearch from './_index-search'

export default class TransactionIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionIndex: [],
      searchInput: '',
      page: '',
      pages: '',
      total: '',
      tableLoading: true,
      //
      doctorModalOpen: false,
      'transaction year': moment().year(),
      'transaction month': moment().month() + 1,
      doctorSearchResult: [],
      selectedDoctor: '',
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

    this.setState({
      [name]: value
    })
  }

  handleSearchChange () {
    this.setState({ tableLoading: true })
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

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      params: {
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: transactionIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ transactionIndex, page, pages, total, tableLoading: false })
    })
  }

  doctorModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ doctorModalOpen: true })
        break

      case 'close':
        this.setState({ doctorModalOpen: false })
        break

      case 'change':
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
        this.setState({
          selectedDoctor: data,
          doctorId: data._id
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
    this.setState({ tableLoading: true })
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

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      params: {
        page: parseInt(event.target.dataset.page, 10),
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: transactionIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ transactionIndex, page, pages, total, tableLoading: false })
    })
  }

  render () {
    const {
      'transaction year': transactionYear,
      'transaction month': transactionMonth,
      selectedDoctor,
      doctorId,
      doctorSearchResult,
      doctorModalOpen,
      pages,
      transactionIndex,
      page,
      tableLoading
    } = this.state

    const nextPage = page === pages ? pages : page + 1
    const prevPage = page === 1 ? 1 : page - 1

    const {
      handleSelectChange,
      handleInputChange,
      doctorModalMethod,
      handleSearchChange,
      handlePaginate
    } = this

    const IndexRows = transactionIndex.map((item) => {
      return <IndexRow key={item._id} transactionData={item} match={this.props.match} />
    })

    const pagesArray = Array.from({length: pages}, (v, i) => i + 1)

    const MenuItems = pagesArray.map((item, index) => {
      return (
        <Menu.Item link
          onClick={handlePaginate}
          data-page={item}
          active={page === item}
          key={'item' + item}>{item}
        </Menu.Item>
      )
    })
    const transactionTable = !tableLoading
    ? <Table celled basic selectable definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Transaction Record</Table.HeaderCell>
          <Table.HeaderCell>Patient</Table.HeaderCell>
          <Table.HeaderCell>Doctor</Table.HeaderCell>
          <Table.HeaderCell>Procedure</Table.HeaderCell>
          <Table.HeaderCell>Transaction / Invoice Number</Table.HeaderCell>
          <Table.HeaderCell>Transaction / Invoice Date</Table.HeaderCell>
          <Table.HeaderCell>Agent</Table.HeaderCell>
          <Table.HeaderCell>Transaction Amount</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {IndexRows}
      </Table.Body>
    </Table>
    : <LoadingSmall />

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
                onChange={() => {}}
                ref={(input) => {
                  this.doctorNameRef = input
                }}
                value={`${selectedDoctor['first name'] || ''} ${selectedDoctor['last name'] || ''}`} />
            </Form.Field>
            <Form.Field>
              <label>Doctor ID</label>
              <input readOnly
                type='text'
                name='receiving doctor'
                onChange={() => {}}
                ref={(input) => {
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
        <Menu floated='right' pagination>
          <Menu.Item as='a' data-page={prevPage} icon onClick={handlePaginate}>
            <Icon name='left chevron' />
          </Menu.Item>
          {MenuItems}
          <Menu.Item as='a' data-page={nextPage} icon>
            <Icon name='right chevron' />
          </Menu.Item>
        </Menu>
        <Divider hidden clearing />
        {transactionTable}
        <DoctorModal
          doctorModalOpen={doctorModalOpen}
          modalMethod={doctorModalMethod}
          doctorSearchResult={doctorSearchResult}
          selectedDoctor={selectedDoctor} />
      </Container>
    )
  }

  componentDidMount () {
    const formData = {
      'transaction year': this.state['transaction year'],
      'transaction month': this.state['transaction month']
    }

    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction`,
      params: {
        search: queryString,
        page: 1
      }
    })
    .then((res) => {
      const {
        docs: transactionIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ transactionIndex, page, pages, total, tableLoading: false })
    })
  }
}
