import React, { Component } from 'react'

import { Menu, Table, Container, Search, Icon } from 'semantic-ui-react'
import axios from 'axios'

import IndexRow from './_index-row'
import LoadingSmall from 'partial/loading-small'

class PatientIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientIndex: [],
      searchInput: '',
      page: '',
      pages: '',
      total: '',
      tableLoading: true
    }
    this.handlePaginate = this.handlePaginate.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange (event, value) {
    this.setState({ tableLoading: true })
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      params: {
        search: value
      }
    })
    .then((res) => {
      const {
        docs: patientIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ patientIndex, page, pages, total, tableLoading: false })
    })
  }

  handlePaginate (event) {
    this.setState({ tableLoading: true })
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`,
      params: {
        page: parseInt(event.target.dataset.page)
      }
    })
    .then((res) => {
      const {
        docs: patientIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ patientIndex, page, pages, total, tableLoading: false })
    })
  }
  render () {
    const {
      pages,
      patientIndex,
      page,
      tableLoading
    } = this.state

    const nextPage = page === pages ? pages : page + 1
    const prevPage = page === 1 ? 1 : page - 1

    const {
      handlePaginate,
      handleSearchChange
    } = this

    const IndexRows = patientIndex.map((item) => {
      return <IndexRow key={item._id} patientData={item} match={this.props.match} />
    })

    const pagesArray = Array.from({length: pages}, (v, i) => i + 1)

    const MenuItems = pagesArray.map((item, index) => {
      return (
        <Menu.Item link
          onClick={handlePaginate}
          data-page={item}
          active={page === item}
          key={'item' + item}>
          {item}
        </Menu.Item>
      )
    })

    const patientTable = !tableLoading
    ? <Table celled basic selectable definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>First Name</Table.HeaderCell>
          <Table.HeaderCell>Last Name</Table.HeaderCell>
          <Table.HeaderCell>Gender</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {IndexRows}
      </Table.Body>
    </Table>
    : <LoadingSmall />

    return (
      <Container>
        <div className='flex flex--row flex--jc-spacebetween'>
          <Search
            showNoResults={false}
            // onResultSelect={this.handleResultSelect}
            onSearchChange={handleSearchChange}
            // results={results}
            // value={value}
            // {...this.props}
          />
          <Menu floated='right' pagination>
            <Menu.Item as='a' data-page={prevPage} icon onClick={handlePaginate}>
              <Icon name='left chevron' />
            </Menu.Item>
            {MenuItems}
            <Menu.Item as='a' data-page={nextPage} icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </div>
        {patientTable}
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient`
    })
    .then((res) => {
      console.log('PatientIndex res', res.data)
      const {
        docs: patientIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ patientIndex, page, pages, total, tableLoading: false })
    })
  }
}

export default PatientIndex
