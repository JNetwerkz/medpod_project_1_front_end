import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { Container, Button, Header, Divider, Form, List, Accordion, Icon, Segment } from 'semantic-ui-react'
import moment from 'moment'

import ErrorMessage from 'partial/error'
import { invoiceStatusType } from 'custom-function'

import './invoice-show.css'

import PrintTemplate from './print-template'
import ViewTemplate from './view-template'

export default class InvoiceShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoiceShow: {},
      name: '',
      createdAt: '',
      loading: true,
      errors: null
    }

    this.openPrintDialog = this.openPrintDialog.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStatusUpdateSubmit = this.handleStatusUpdateSubmit.bind(this)
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

  handleStatusUpdateSubmit (event) {
    event.preventDefault()
    const {
      _id
    } = this.state.invoiceShow

    const formData = this.state

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice/${_id}/status/new`,
      data: formData
    })
    .then((res) => {
      const { errors } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        invoiceShow: res.data,
        errors: null,
        name: ''
      })
    })
    .catch((err) => console.error(err))
  }

  openPrintDialog () {
    window.print()
  }

  render () {
    if (this.state.loading) return <Segment loading />
    const {
      invoiceShow,
      name,
      errors
    } = this.state

    const {
      handleSelectChange,
      openPrintDialog,
      handleStatusUpdateSubmit
    } = this

    const {
      statuses
    } = invoiceShow

    const lastIndexOfStatus = statuses.length - 1
    let lastStatus, lastStatusName

    const statusList = statuses.map((status, index) => {
      // if (index === lastIndexOfStatus) {
      //   lastStatus = status
      // }
      lastStatus = index === lastIndexOfStatus ? status : ''

      const momentUpdatedAt = moment(status.createdAt).format('DD MMM YYYY')
      return <List.Item key={`${status.name}-${index}`}>
        <List.Content>
          <List.Header as='a'>{status.name}</List.Header>
          <List.Description as='a'>status updated at {momentUpdatedAt}</List.Description>
        </List.Content>
      </List.Item>
    })

    if (statuses.length > 0) {
      lastStatusName = lastStatus.name
    } else {
      lastStatusName = ''
    }

    return (
      <Container fluid>
        <ErrorMessage errors={errors} />
        <Divider hidden section />
        <div className='flex flex--row flex--jc-spacearound'>
          <section>
            <ViewTemplate {...invoiceShow} />
          </section>
          <section>
            <Header as='h3' dividing color='red'>
              <Header.Subheader>
                Current Status
              </Header.Subheader>
              {lastStatusName}
            </Header>
            <Button fluid compact primary onClick={openPrintDialog}>Print Invoice</Button>
            <Divider hidden section />
            <Header as='h3' dividing color='blue'>
              Update Status
            </Header>
            <Form onSubmit={handleStatusUpdateSubmit}>
              <Form.Select value={name} label='Name' name='name' options={invoiceStatusType} onChange={(e, {value}) => handleSelectChange(e, value, 'name')} />
              <Button positive fluid type='submit'>Update</Button>
            </Form>
            <Divider section />
            <Accordion>
              <Accordion.Title as={Header} color='blue' dividing>
                <Icon name='dropdown' />
                Status History
              </Accordion.Title>
              <Accordion.Content>
                <List divided relaxed>
                  {statusList}
                </List>
              </Accordion.Content>
            </Accordion>
          </section>
        </div>
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/invoice/${this.props.match.params.id}`
    })
    .then((res) => {
      this.setState({ invoiceShow: res.data, loading: false })
      ReactDOM.render(<PrintTemplate {...this.state.invoiceShow} />, document.getElementById('print-mount'))
    })
    .catch((err) => console.error(err))
  }
}
