import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Search, Table, Menu, Container, Icon } from 'semantic-ui-react'

import axios from 'axios'

import { combineName } from 'custom-function'

import IndexRow from './_index-row'

class DoctorIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      doctorIndex: [],
      searchInput: '',
      page: '',
      pages: '',
      total: '',
      searchLoading: false
    }
    this.handlePaginate = this.handlePaginate.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }
  handleSearchChange (event, value) {
    console.log(value)
    this.setState({ searchLoading: true })
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor`,
      params: {
        search: value
      }
    })
    .then((res) => {
      const {
        docs: doctorIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ doctorIndex, page, pages, total, searchLoading: false })
    })
  }

  handlePaginate (event) {
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

      this.setState({ agentIndex, page, pages, total })
    })
  }

  render () {
    const {
      pages,
      doctorIndex,
      page,
      searchLoading
    } = this.state

    const nextPage = page === pages ? pages : page + 1
    const prevPage = page === 1 ? 1 : page - 1

    const {
      handlePaginate,
      handleSearchChange
    } = this

    const IndexRows = doctorIndex.map((item) => {
      return <IndexRow key={item._id} doctorData={item} match={this.props.match} />
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

    return (
      <Container>
        <Search
          showNoResults={false}
          loading={searchLoading}
          // onResultSelect={this.handleResultSelect}
          onSearchChange={handleSearchChange}
          // results={results}
          // value={value}
          // {...this.props}
        />
        <Table celled basic selectable definition>
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
        <Menu floated='right' pagination>
          <Menu.Item as='a' data-page={prevPage} icon onClick={handlePaginate}>
            <Icon name='left chevron' />
          </Menu.Item>
          {MenuItems}
          <Menu.Item as='a' data-page={nextPage} icon>
            <Icon name='right chevron' />
          </Menu.Item>
        </Menu>
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/doctor`
    })
    .then((res) => {
      console.log('DoctorIndex res', res.data)
      const {
        docs: doctorIndex,
        page,
        pages,
        total
      } = res.data

      this.setState({ doctorIndex, page, pages, total })
    })
  }
}

export default DoctorIndex
