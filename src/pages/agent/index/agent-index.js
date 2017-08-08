import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container, Header, Table, Menu, Icon, Search } from 'semantic-ui-react'

import axios from 'axios'

import IndexRow from './_index-row'
import LoadingSmall from 'partial/loading-small'

export default class AgentIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agentIndex: [],
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
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent`,
      params: {
        search: value
      }
    })
    .then((res) => {
      const {
        docs: agentIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ agentIndex, page, pages, total, tableLoading: false })
    })
  }

  handlePaginate (event) {
    this.setState({ tableLoading: true })
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent`,
      params: {
        page: parseInt(event.target.dataset.page)
      }
    })
    .then((res) => {
      const {
        docs: agentIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ agentIndex, page, pages, total, tableLoading: false })
    })
  }

  render () {
    const {
      pages,
      agentIndex,
      page,
      tableLoading
    } = this.state

    const nextPage = page === pages ? pages : page + 1
    const prevPage = page === 1 ? 1 : page - 1

    const {
      handlePaginate,
      handleSearchChange
    } = this

    const IndexRows = agentIndex.map((item) => {
      return <IndexRow key={item._id} agentData={item} match={this.props.match} />
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
    const agentTable = !tableLoading
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
        {agentTable}
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/agent`
    })
    .then((res) => {
      console.log('AgentIndex res', res.data)

      const {
        docs: agentIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ agentIndex, page, pages, total, tableLoading: false })
    })
  }
}
