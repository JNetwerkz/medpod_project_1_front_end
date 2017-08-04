import React, { Component } from 'react'

import { Container, Header, Form, Segment, Input, Button, Grid, Item } from 'semantic-ui-react'

import axios from 'axios'
import moment from 'moment'
import * as fileExtension from 'file-extension'
import * as FileSaver from 'file-saver'

import { combineName, uploadFileOption } from 'custom-function'
import { s3, s3Bucket as Bucket } from 'aws'

import AgentModal from 'partial/modal/agent-modal'
import ErrorMessage from 'partial/error'
import FileInputRow from 'partial/_fileInputRow'
import FileRow from 'partial/_fileRow'

class PatientShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patientShow: {},
      notEditing: true,
      'first name': '',
      'last name': '',
      'ic / passport': '',
      gender: '',
      referral_agent: {},
      // modal
      agentModalOpen: false,
      agentSearchResult: [],
      selectedAgent: {},
      searchFocus: false,
      errors: null,
      uploadedFiles: [],
      filesToUpload: [],
      filesStatus: []
    }
    this.handleEditState = this.handleEditState.bind(this)
    this.agentModalMethod = this.agentModalMethod.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
    this.handleFileDelete = this.handleFileDelete.bind(this)
    this.handleFileDownload = this.handleFileDownload.bind(this)
    this.handleAddInput = this.handleAddInput.bind(this)
    this.handleDeleteInput = this.handleDeleteInput.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
  }

  handleEditState (event) {
    const {
      notEditing,
      patientShow
    } = this.state

    if (notEditing) {
      // change to edit mode
      return this.setState({ notEditing: !notEditing })
    } else {
      // revert back to view mode
      return this.setState({ notEditing: !notEditing, ...patientShow })
    }
  }

  handleEditChange (event) {
    const {
      value,
      name
    } = event.target

    this.setState({
      [name]: value
    })

    console.log(name, value)
  }

  handleUpdateSubmit () {
    const {
      'first name': firstName,
      'last name': lastName,
      'ic / passport': icPassport,
      gender,
      referral_agent
    } = this.state

    const formData = {
      'first name': firstName,
      'last name': lastName,
      gender,
      'ic / passport': icPassport,
      referral_agent: referral_agent._id
    }

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient/${this.props.match.params.id}`,
      data: formData
    })
    .then((res) => {
      const { errors } = res.data

      errors
      ? this.setState({ errors })
      : this.setState({
        patientShow: res.data,
        notEditing: true,
        ...res.data,
        errors: null
      })
    })
    .catch((err) => console.error(err))
  }

  agentModalMethod (type, event, data) {
    switch (type) {
      case 'open':
        this.setState({ agentModalOpen: true, searchFocus: true })
        break

      case 'close':
        console.log('closing modal')
        this.setState({ agentModalOpen: false })
        break

      case 'change':
        console.log('searching agent')
        if (event.currentTarget.value.length >= 2) {
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}/agent/search`, {
            params: { search: event.currentTarget.value }
          })
          .then((res) => {
            this.setState({ agentSearchResult: res.data })
          })
          .catch((err) => console.error(err))
        }
        break
      case 'select':
        console.log('select agent')
        console.log(data)
        this.setState({
          selectedAgent: data,
          referral_agent: data
          // patientModalOpen: false
        })

        const eventBubbleName = new Event('input', { bubbles: true })
        this.agentNameRef.dispatchEvent(eventBubbleName)
        const eventBubbleId = new Event('input', { bubbles: true })
        this.agentIdRef.dispatchEvent(eventBubbleId)

        break
      default:
        break
    }
  }

  handleFileDownload (index) {
    const {
      uploadedFiles
    } = this.state

    const { Key } = uploadedFiles[index]
    const downloadPromise = s3.getObject({ Bucket, Key }).promise()

    return downloadPromise
    .then((res) => {
      console.log('file download respond', res)
      const file = new Blob([ res.Body ])
      console.log('blob', file)
      return FileSaver.saveAs(file, Key)
    })
    .catch((err) => {
      console.error('file download error', err)
    })
  }

  handleFileDelete (index) {
    const {
      uploadedFiles
    } = this.state

    const { Key, _id } = uploadedFiles[index]
    const deletePromise = s3.deleteObject({ Bucket, Key }).promise()

    return deletePromise
    .then((res) => {
      console.log(res)
      return axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/file/${_id}`)
    })
    .then((res) => {
      if (res.status === 200) {
        uploadedFiles.splice(index, 1)
        this.setState({ uploadedFiles })
      }
    })
    .catch((err) => {
      console.error('file delete error', err)
    })
  }

  handleAddInput () {
    const {
      filesToUpload,
      filesStatus
    } = this.state

    filesToUpload.push({ file: '', description: '', fileType: '', uploading: false })
    // filesStatus.push({ uploading: false })

    this.setState({
      filesToUpload, filesStatus
    })
  }

  handleDeleteInput (index) {
    const {
      filesToUpload
    } = this.state

    filesToUpload.splice(index, 1)

    this.setState({
      filesToUpload
    })
  }

// handles uploading of file
  handleFileUpload (index) {
    const {
      filesToUpload,
      patientShow
    } = this.state
    const stamp = moment().format('DDMMYYHHmmssSS')
    const {
      'first name': firstName,
      'last name': lastName,
      _id: patientId
    } = patientShow

    const {
      description,
      file,
      fileType,
      file: { name: fileName }
    } = filesToUpload[index]

    const Key = `${firstName} ${lastName}_${fileType || ''}_${stamp}.${fileExtension(fileName)}`

    const params = {
      Body: file,
      Bucket,
      Key
    }

    const uploadPromise = s3.putObject(params).promise()

    return (
      uploadPromise
        .then((res) => {
          const data = { Key, description, fileType, patient: patientId }
          return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/file`, data)
        })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            const {
              uploadedFiles
            } = this.state

            uploadedFiles.unshift(res.data)
            filesToUpload.splice(index, 1)

            this.setState({ uploadedFiles, filesToUpload })
          }
        })
        .catch((err) => {
          console.error('AWS fileupload error', err)
        })
    )
  }

  handleFileInputChange (event, value, index, type) {
    const {
      filesToUpload
    } = this.state

    switch (type) {
      case 'fileChange':
        filesToUpload[index].file = event.target.files[0] || ''
        filesToUpload[index].file = event.target.files[0] || ''

        this.setState({
          filesToUpload
        })
        break
      case 'descripChange':
        filesToUpload[index].description = value || ''

        this.setState({
          filesToUpload
        })
        break
      case 'fileTypeChange':
        filesToUpload[index].fileType = value || ''

        this.setState({
          filesToUpload
        })
        break
      default:
        break
    }
  }

  render () {
    const {
      notEditing,
      patientShow,
      'first name': firstName,
      'last name': lastName,
      'ic / passport': icPassport,
      gender,
      referral_agent,
      // modal
      agentModalOpen,
      agentSearchResult,
      selectedAgent,
      searchFocus,
      uploadedFiles,
      filesToUpload,
      errors
    } = this.state

    const {
      'first name': agentFirstName,
      'last name': agentLastName,
      _id: agentId
    } = referral_agent

    const {
      handleEditState,
      handleEditChange,
      handleUpdateSubmit,
      agentModalMethod,
      handleFileDelete,
      handleFileDownload,
      handleDeleteInput,
      handleFileUpload,
      handleAddInput,
      handleFileInputChange
    } = this

    const editButton = notEditing
    ? <Button type='button' primary floated='right' onClick={handleEditState}>Edit</Button>
    : <Button type='button' primary floated='right' onClick={handleEditState}>Cancel</Button>

    const UploadedFiles = uploadedFiles.map((file, index) => {
      return <FileRow
        data={file}
        key={file._id}
        index={index}
        handleFileDownload={handleFileDownload}
        handleFileDelete={handleFileDelete}
      />
    })
    const FileUpload = filesToUpload.map((file, index) => {
      return <FileInputRow
        key={`upload-${index}`}
        data={file}
        index={index}
        handleChange={handleFileInputChange}
        handleDeleteInput={handleDeleteInput}
        handleFileUpload={handleFileUpload}
        fileTypeSelection={uploadFileOption}
      />
    })
    return (
      <Container>
        <ErrorMessage errors={errors} />
        <Header as='h1'>
          {firstName} {lastName}
          {editButton}
        </Header>
        <Form>
          <Segment>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>First Name</label>
                {
                notEditing
                ? <p>{firstName}</p>
                : <Input
                  size='huge'
                  value={firstName}
                  onChange={handleEditChange}
                  name='first name'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                {
                notEditing
                ? <p>{lastName}</p>
                : <Input
                  size='huge'
                  value={lastName}
                  onChange={handleEditChange}
                  name='last name'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
              <Form.Field>
                <label>IC / Passport</label>
                {
                notEditing
                ? <p>{icPassport}</p>
                : <Input
                  size='huge'
                  value={icPassport}
                  onChange={handleEditChange}
                  name='ic / passport'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
              <Form.Field>
                <label>Gender</label>
                {
                notEditing
                ? <p>{gender}</p>
                : <Input
                  size='huge'
                  value={gender}
                  onChange={handleEditChange}
                  name='gender'
                  // transparent
                  disabled={notEditing}
                   />
              }
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Agent</label>
                {
                  notEditing
                  ? <p>{agentFirstName} {agentLastName}</p>
                  : <input onClick={() => this.agentModalMethod('open')} type='text' name='agentName'
                    readOnly
                    onChange={() => console.log()}
                    ref={(input) => {
                      console.log('input', input)
                      this.agentNameRef = input
                    }}
                    value={`${agentFirstName} ${agentLastName}`} />
                }
              </Form.Field>
              <Form.Field>
                {
                  notEditing
                  ? ''
                  : <label>Agent ID</label>
                }
                {
                  notEditing
                  ? ''
                  : <input readOnly
                    type='text'
                    name='referral_agent'
                    onChange={() => console.log()}
                    ref={(input) => {
                      console.log('input', input)
                      this.agentIdRef = input
                    }}
                    value={agentId} />
                }

              </Form.Field>
            </Form.Group>
          </Segment>
          <Button onClick={handleUpdateSubmit} positive>
            Confirm
          </Button>
        </Form>
        <Header as='h2'>
          Files
        </Header>
        <Segment>
          <Grid divided>
            <Grid.Row columns={2} >
              <Grid.Column>
                <Item.Group divided relaxed>
                  {UploadedFiles}
                </Item.Group>
              </Grid.Column>
              <Grid.Column>
                <Button floated='right' compact primary onClick={handleAddInput}>Add Upload</Button>
                <Item.Group divided relaxed>
                  {FileUpload}
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <AgentModal
          agentModalOpen={agentModalOpen}
          modalMethod={agentModalMethod}
          agentSearchResult={agentSearchResult}
          selectedAgent={selectedAgent}
          searchFocus={searchFocus}
        />
      </Container>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/patient/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('PatientShow res', res.data)
      this.setState({ patientShow: res.data, ...res.data })

      return axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/file`, { params: { patient: res.data._id } })
    })
    .then((res) => {
      this.setState({ uploadedFiles: res.data })
    })
    .catch((err) => console.error(err))
  }
}

export default PatientShow
