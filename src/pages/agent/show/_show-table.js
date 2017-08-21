import React, { Component } from 'react'

import { Table, Form, Menu, Icon, Container, Divider } from 'semantic-ui-react'
import moment from 'moment'
import qs from 'qs'
import axios from 'axios'

import { M6117, combineName, monthsSelectOption } from 'custom-function'

import IndexRow from './_index-row'
import LoadingSmall from 'partial/loading-small'

export default class CommissionTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoiceYear: moment().year(),
      invoiceMonth: moment().month() + 1,
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
      invoiceYear,
      invoiceMonth
    } = this.state

    const formData = {
      invoiceYear,
      invoiceMonth
    }
    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/commission`,
      params: {
        page: parseInt(event.target.dataset.page),
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

      agentCommissions.map((item) => {
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

    console.log(name, value)

    this.setState({
      [name]: value
    })
  }

  handleSearchChange () {
    this.setState({ commissionTableLoading: true })
    const {
      invoiceYear,
      invoiceMonth
    } = this.state

    const formData = {
      invoiceYear, invoiceMonth
    }
    const queryString = qs.stringify(formData)

    console.log(queryString)

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

      agentCommissions.map((item) => {
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
      console.log(agentCommissions)

      this.setState({ agentCommissions, commissionButtonLoading: { [id]: false } })
    })
    .catch((err) => console.error(err))
  }

  componentDidMount () {
    const {
      invoiceMonth,
      invoiceYear
    } = this.state

    const referralAgentId = this.props.match.params.id

    const formData = { invoiceMonth, invoiceYear, referralAgentId }

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
      console.log(res.data.docs)
      const {
        docs: agentCommissions,
        total,
        ...rest
      } = res.data
      const commissionInputs = {}

      agentCommissions.map((item) => {
        commissionInputs[item._id] = item.commissionAmount
      })

      // console.log(commissionInputs)

      this.setState({ agentCommissions, ...commissionInputs, ...rest, commissionTableLoading: false })
    })
    .catch((err) => console.error(err))
  }

  render () {
    console.log(this.state)
    const {
      invoiceYear,
      invoiceMonth,
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
      handleCommissionChange,
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
    ? <Table celled basic selectable definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Transaction Record</Table.HeaderCell>
          <Table.HeaderCell>Invoice Number</Table.HeaderCell>
          <Table.HeaderCell>Invoice Date</Table.HeaderCell>
          <Table.HeaderCell>Invoice Status</Table.HeaderCell>
          <Table.HeaderCell>Patient</Table.HeaderCell>
          <Table.HeaderCell>Doctor</Table.HeaderCell>
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
              label='Month'
              options={monthsSelectOption}
              placeholder='Select Month'
              value={invoiceMonth}
              name='invoiceMonth'
              onChange={(e, {value}) => handleSelectChange(e, value, 'invoiceMonth')} />
            <Form.Input
              label='Year'
              placeholder='IE: 2017'
              name='invoiceYear'
              value={invoiceYear}
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
