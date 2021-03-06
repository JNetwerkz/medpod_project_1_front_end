import React, { Component } from 'react'
import { Container, Header, Segment, List, Dropdown } from 'semantic-ui-react'

import axios from 'axios'

import ErrorMessage from 'partial/error'

const AddonRow = (props) => {
  const {
    addonData: { name, status, _id },
    handleAddOnUpdate
  } = props

  const icon = status === 'active' ? 'circle' : 'circle thin'
  const iconColor = status === 'active' ? 'green' : 'grey'
  const text = status === 'active' ? 'archive' : 'active'
  return (
    <List.Item>
      <List.Icon color={iconColor} name={icon} />
      <List.Content>
        <List.Header as='a'>{name}</List.Header>
        <List.Description>
          <Dropdown text={status}>
            <Dropdown.Menu>
              <Dropdown.Item
                data-id={_id}
                data-status={status}
                text={text}
                onClick={handleAddOnUpdate}
               />
            </Dropdown.Menu>
          </Dropdown>
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default class AddonIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addonIndex: [],
      errors: null,
      segmentLoading: true
    }
    this.handleAddOnUpdate = this.handleAddOnUpdate.bind(this)
  }

  handleAddOnUpdate (event) {
    const { dataset: { status, id } } = event.currentTarget
    axios
    .put(`${process.env.REACT_APP_API_ENDPOINT}/addon/${id}/status`,
      { status: status === 'active' ? 'archived' : 'active' })
    .then((res) => {
      const { errors } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        addonIndex: res.data,
        errors: null
      })
    })
    .catch((err) => console.error(err))
  }

  render () {
    const { addonIndex, errors, segmentLoading } = this.state
    const { handleAddOnUpdate } = this
    let AddonRows = addonIndex.map((item) => {
      return <AddonRow key={item._id} addonData={item} match={this.props.match} handleAddOnUpdate={handleAddOnUpdate} />
    })
    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Header as='h1'>
          All Add-ons
        </Header>
        <Segment loading={segmentLoading}>
          <List size='large' divided relaxed>
            {AddonRows}
          </List>
        </Segment>
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/addon`
    })
    .then((res) => {
      this.setState({ addonIndex: res.data, segmentLoading: false })
    })
  }
}
