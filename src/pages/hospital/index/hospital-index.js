import React, { Component } from 'react'

import { Container, Table, Menu, Icon, Search } from 'semantic-ui-react'

import axios from 'axios'

import IndexRow from './_index-row'
import LoadingSmall from 'partial/loading-small'

export default class HospitalIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hospitalIndex: [],
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
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital`,
      params: {
        search: value
      }
    })
    .then((res) => {
      const {
        docs: hospitalIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ hospitalIndex, page, pages, total, tableLoading: false })
    })
  }

  handlePaginate (event) {
    this.setState({ tableLoading: true })
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital`,
      params: {
        page: parseInt(event.target.dataset.page, 10)
      }
    })
    .then((res) => {
      const {
        docs: hospitalIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ hospitalIndex, page, pages, total, tableLoading: false })
    })
  }

  render () {
    const {
      pages,
      hospitalIndex,
      page,
      tableLoading
    } = this.state

    const nextPage = page === pages ? pages : page + 1
    const prevPage = page === 1 ? 1 : page - 1

    const {
      handlePaginate,
      handleSearchChange
    } = this

    const IndexRows = hospitalIndex.map((item) => {
      return <IndexRow key={item._id} hospitalData={item} match={this.props.match} />
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

    const hospitalTable = !tableLoading
    ? <Table celled basic selectable definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Contact Number</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Name Abbreviation</Table.HeaderCell>
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
            onSearchChange={handleSearchChange}
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
        {hospitalTable}
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/hospital`
    })
    .then((res) => {
      const {
        docs: hospitalIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ hospitalIndex, page, pages, total, tableLoading: false })
    })
  }
}
