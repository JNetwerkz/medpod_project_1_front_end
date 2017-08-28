import React, { Component } from 'react'

import { Table, Form, Menu, Icon, Container, Divider } from 'semantic-ui-react'
import moment from 'moment'
import qs from 'qs'
import axios from 'axios'

import { monthsSelectOption } from 'custom-function'

import IndexRow from './_index-row'
import LoadingSmall from 'partial/loading-small'

export default class CommissionTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionYear: moment().year(),
      transactionMonth: moment().month() + 1,
      page: '',
      pages: '',
      agentCommissions: [],
      commissionButtonLoading: {},
      commissionTableLoading: true
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handlePaginate = this.handlePaginate.bind(this)
    this.handleCommissionSubmit = this.handleCommissionSubmit.bind(this)
  }

  handlePaginate (event) {
    this.setState({ commissionTableLoading: true })
    const {
      transactionYear,
      transactionMonth
    } = this.state

    const formData = {
      transactionYear,
      transactionMonth
    }
    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/commission`,
      params: {
        page: parseInt(event.target.dataset.page, 10),
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: agentCommissions,
        page,
        pages
      } = res.data

      const commissionInputs = {}

      agentCommissions.forEach((item) => {
        commissionInputs[item._id] = item.commissionAmount
      })

      this.setState({ agentCommissions, ...commissionInputs, page, pages, commissionTableLoading: false })
    })
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
    this.setState({ commissionTableLoading: true })
    const {
      transactionYear,
      transactionMonth
    } = this.state

    const referralAgentId = this.props.match.params.id

    const formData = {
      transactionYear, transactionMonth, referralAgentId
    }
    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/commission`,
      params: {
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: agentCommissions,
        page,
        pages
      } = res.data
      const commissionInputs = {}

      agentCommissions.forEach((item) => {
        commissionInputs[item._id] = item.commissionAmount
      })

      this.setState({ agentCommissions, ...commissionInputs, page, pages, commissionTableLoading: false })
    })
  }

  handleCommissionSubmit (event) {
    const id = event.target.name
    const { [id]: commissionAmount, agentCommissions: _agentCommissions } = this.state
    this.setState({ commissionButtonLoading: { [id]: true } })

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_ENDPOINT}/commission/${id}`,
      data: { commissionAmount }
    })
    .then((res) => {
      const agentCommissions = _agentCommissions.map((item) => {
        return res.data._id === item._id
        ? res.data
        : item
      })
      this.setState({ agentCommissions, commissionButtonLoading: { [id]: false } })
    })
    .catch((err) => console.error(err))
  }

  componentDidMount () {
    const {
      transactionMonth,
      transactionYear
    } = this.state

    const referralAgentId = this.props.match.params.id

    const formData = { transactionMonth, transactionYear, referralAgentId }

    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/commission`,
      params: {
        search: queryString,
        page: 1
      }
    })
    .then((res) => {
      const {
        docs: agentCommissions,
        ...rest
      } = res.data
      const commissionInputs = {}

      agentCommissions.forEach((item) => {
        commissionInputs[item._id] = item.commissionAmount
      })

      // console.log(commissionInputs)

      this.setState({ agentCommissions, ...commissionInputs, ...rest, commissionTableLoading: false })
    })
    .catch((err) => console.error(err))
  }

  render () {
    const {
      transactionYear,
      transactionMonth,
      page,
      pages,
      agentCommissions,
      commissionTableLoading
    } = this.state

    const {
      handleSelectChange,
      handleInputChange,
      handleSearchChange,
      handlePaginate,
      handleCommissionSubmit
    } = this

    const nextPage = page === pages ? pages : page + 1
    const prevPage = page === 1 ? 1 : page - 1

    const IndexRows = agentCommissions.map((item) => {
      const commissionInput = this.state[item._id]
      console.log(commissionInput)
      return <IndexRow key={item._id}
        updating={this.state.commissionButtonLoading[item._id] || false}
        commissionData={item}
        commissionInput={commissionInput}
        handleInputChange={handleInputChange}
        handleCommissionSubmit={handleCommissionSubmit} />
    })

    const pagesArray = Array.from({length: pages}, (v, i) => i + 1)

    const MenuItems = pagesArray.map((item, index) => {
      console.log(typeof item)
      return (
        <Menu.Item link
          onClick={handlePaginate}
          data-page={item}
          active={page === item}
          key={'item' + item}>{item}
        </Menu.Item>
      )
    })

    const table = !commissionTableLoading
    ? <Table size='small' celled basic selectable definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Transaction Record</Table.HeaderCell>
          <Table.HeaderCell>Patient</Table.HeaderCell>
          <Table.HeaderCell>Doctor</Table.HeaderCell>
          <Table.HeaderCell>Invoice Number</Table.HeaderCell>
          <Table.HeaderCell>Invoice Date</Table.HeaderCell>
          <Table.HeaderCell>Invoice Status</Table.HeaderCell>
          <Table.HeaderCell>Invoice Amount</Table.HeaderCell>
          <Table.HeaderCell>Commission Amount (SGD $)</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {IndexRows}
      </Table.Body>
    </Table>
    : <LoadingSmall />

    return (
      <Container fluid>
        <Form onSubmit={handleSearchChange}>
          <Form.Group widths='equal'>
            <Form.Select
              label='Medipod Invoice Month'
              options={monthsSelectOption}
              placeholder='Select Month'
              value={transactionMonth}
              name='transactionMonth'
              onChange={(e, {value}) => handleSelectChange(e, value, 'transactionMonth')} />
            <Form.Input
              label='Medipod Invoice Year'
              placeholder='IE: 2017'
              name='transactionYear'
              value={transactionYear}
              onChange={handleInputChange} />
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
        <Divider clearing hidden />
        {table}
      </Container>

    )
  }
}
