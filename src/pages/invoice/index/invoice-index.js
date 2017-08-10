import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container, Header, Table, Menu, Icon, Search, Form, Divider } from 'semantic-ui-react'

import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

import { AuthHeader, M6117, combineName, monthsSelectOption } from 'custom-function'

import IndexRow from './_index-row'
import DoctorModal from 'partial/modal/doctor-modal'
import LoadingSmall from 'partial/loading-small'

// import TransactionIndexSearch from './_index-search'

export default class InvoiceIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoiceIndex: [],
      searchInput: '',
      page: '',
      pages: '',
      total: '',
      tableLoading: true,
      //
      doctorModalOpen: false,
      monthCreated: moment().month() + 1,
      yearCreated: moment().year(),
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
    this.setState({ tableLoading: true })
    const {
      monthCreated,
      yearCreated,
      doctorId: invoicing_doctor
    } = this.state

    const formData = {
      monthCreated,
      yearCreated,
      invoicing_doctor
    }
    console.log(formData)

    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice`,
      params: {
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: invoiceIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ invoiceIndex, page, pages, total, tableLoading: false })
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
    this.setState({ tableLoading: true })
    const {
      monthCreated,
      yearCreated,
      doctorId: invoicing_doctor
    } = this.state

    const formData = {
      monthCreated,
      yearCreated,
      invoicing_doctor
    }
    const queryString = qs.stringify(formData)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice`,
      params: {
        page: parseInt(event.target.dataset.page),
        search: queryString
      }
    })
    .then((res) => {
      const {
        docs: invoiceIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ invoiceIndex, page, pages, total, tableLoading: false })
    })
  }

  render () {
    const {
      monthCreated,
      yearCreated,
      selectedDoctor,
      doctorId,
      doctorSearchResult,
      doctorModalOpen,
      pages,
      invoiceIndex,
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

    const IndexRows = invoiceIndex.map((item) => {
      return <IndexRow key={item._id} invoiceData={item} match={this.props.match} />
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

    const invoiceTable = !tableLoading
    ? <Table celled basic selectable definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Invoice Number</Table.HeaderCell>
          <Table.HeaderCell>Date Created</Table.HeaderCell>
          <Table.HeaderCell>Invoicing Doctor</Table.HeaderCell>
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
              value={monthCreated}
              onChange={(e, {value}) => handleSelectChange(e, value, 'monthCreated')} />
            <Form.Input
              label='Year'
              name='yearCreated'
              value={yearCreated}
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
        {invoiceTable}
        <DoctorModal
          doctorModalOpen={doctorModalOpen}
          modalMethod={doctorModalMethod}
          doctorSearchResult={doctorSearchResult}
          selectedDoctor={selectedDoctor} />
      </Container>
    )
  }

  componentDidMount () {
    const {
      monthCreated,
      yearCreated
    } = this.state

    const formData = {
      monthCreated,
      yearCreated
    }

    const queryString = qs.stringify(formData)

    console.log(queryString)

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice`,
      params: {
        search: queryString,
        page: 1
      }
    })
    .then((res) => {
      const {
        docs: invoiceIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ invoiceIndex, page, pages, total, tableLoading: false })
    })
  }
}
