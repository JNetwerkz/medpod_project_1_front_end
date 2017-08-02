import React from 'react'

import { Table, Form, Menu, Icon, Container } from 'semantic-ui-react'

import { M6117, combineName, monthsSelectOption } from 'custom-function'

import IndexRow from './_index-row'

const TransactionTable = (props) => {
  const {
    handleSelectChange,
    handleInputChange,
    handleSearchChange,
    transactionYear,
    transactionMonth,
    handlePaginate,
    page,
    pages,
    agentTransactions
  } = props

  const nextPage = page === pages ? pages : page + 1
  const prevPage = page === 1 ? 1 : page - 1

  const IndexRows = agentTransactions.map((item) => {
    return <IndexRow key={item._id} transactionData={item} />
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
  return (
    <Container fluid>
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
            <label>&nbsp;</label>
            <Form.Button type='submit' fluid>
              Search
            </Form.Button>
          </Form.Field>
        </Form.Group>
      </Form>
      <Table celled basic selectable definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Transaction Record</Table.HeaderCell>
            <Table.HeaderCell>Invoice Number</Table.HeaderCell>
            <Table.HeaderCell>Invoice Date</Table.HeaderCell>
            <Table.HeaderCell>Patient</Table.HeaderCell>
            <Table.HeaderCell>Doctor</Table.HeaderCell>
            <Table.HeaderCell>Agent</Table.HeaderCell>
            <Table.HeaderCell>Transaction Amount</Table.HeaderCell>
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

export default TransactionTable
