import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container, Segment, Button, Header, Form, Input, Grid, Item, Divider } from 'semantic-ui-react'

import axios from 'axios'
import moment from 'moment'
import * as currencyFormatter from 'currency-formatter'
import * as fileExtension from 'file-extension'
import * as FileSaver from 'file-saver'

import { AuthHeader, M6117, combineName, uploadFileOption } from 'custom-function'
import { s3, s3Bucket as Bucket } from 'aws'

import FileInputRow from 'partial/_fileInputRow'
import FileRow from 'partial/_fileRow'
import S3Subheader from 'partial/_subheaders'

class TransactionShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionShow: {},
      uploadedFiles: [],
      segmentLoading: true,
      //
      fileTypeSelection: [
        { key: 'medicalReport', text: 'Medical Report', value: 'medical_report' },
        { key: 'invoice', text: 'Invoice', value: 'invoice' },
        { key: 'receipt', text: 'Receipt', value: 'receipt' },
        { key: 'identification', text: 'Identification Document', value: 'identification' },
        { key: 'others', text: 'Others', value: 'other' }
      ],
      filesToUpload: [],
      filesStatus: []
    }

    this.handleAddInput = this.handleAddInput.bind(this)
    this.handleDeleteInput = this.handleDeleteInput.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
    this.handleFileDownload = this.handleFileDownload.bind(this)
    this.handleFileDelete = this.handleFileDelete.bind(this)
  }

// handle download & delete of uploaded files
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

// adds <input> to upload file
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
      transactionShow
    } = this.state
    const stamp = moment().format('DDMMYYHHmmssSS')
    const {
      _id: transactionId,
      patient: { _id: patientId, 'first name': firstName, 'last name': lastName },
      'receiving_doctor': { _id: doctorId }
    } = transactionShow

    const {
      description,
      file,
      fileType,
      file: { name: fileName }
    } = filesToUpload[index]

    const Key = `${firstName} ${lastName} ${fileType || ''} ${stamp}.${fileExtension(fileName)}`

    const params = {
      Body: file,
      Bucket,
      Key
    }

    const uploadPromise = s3.putObject(params).promise()

    return (
      uploadPromise
        .then((res) => {
          const data = { Key, description, fileType, patient: patientId, transaction: transactionId, doctor: doctorId }
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

  // handleAllFileUpload () {
  //   const patientId = this.transactionShow.patient._id
  //   const files = this.files
  //
  //   const uploadPromise = files.map((item) => {
  //     console.log(item)
  //     const fileExt = fileExtension(item.file.name)
  //     console.log(fileExt)
  //     const stamp = moment().format('DDMMYYHHmmssSS')
  //     const Key = `${patientId}_${item.fileType || ''}_${stamp}.${fileExt}`
  //     const params = {
  //       Body: item.file,
  //       Bucket,
  //       Key
  //     }
  //     return s3.putObject(params).promise()
  //   })
  //   //
  //   Promise.all(uploadPromise)
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((err) => console.error(err))
  // }

// handle onChange event of <input> file
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
      filesToUpload,
      uploadedFiles,
      transactionShow,
      segmentLoading
    } = this.state

    const {
      handleFileInputChange,
      handleDeleteInput,
      handleFileUpload,
      handleFileDownload,
      handleFileDelete,
      handleAddInput
    } = this

    const {
      patient,
      receiving_doctor,
      'invoice date': invoiceDate,
      'invoice number': invoiceNumber,
      'transaction amount': transactionAmount
    } = transactionShow

    const momentInvoiceDate = moment(invoiceDate).format('DD MMM YYYY')
    const formattedTransactionAmount = currencyFormatter.format(transactionAmount, { code: 'SGD' })
    const patientName = combineName(patient)
    const doctorName = combineName(receiving_doctor)

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
    const UploadedFiles = uploadedFiles.map((file, index) => {
      return <FileRow
        data={file}
        key={file._id}
        index={index}
        handleFileDownload={handleFileDownload}
        handleFileDelete={handleFileDelete}
      />
    })

    const content = segmentLoading
    ? <Segment basic loading />
    : <Form>
      <S3Subheader text='Transaction Details' />
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Patient</label>
          <Link to={`/patient/${patient._id}`}><p>{patientName}</p></Link>
        </Form.Field>
        <Form.Field>
          <label>Doctor</label>
          <Link to={`/doctor/${receiving_doctor._id}`}><p>Dr. {doctorName}</p></Link>
        </Form.Field>
        <Form.Field>
          <label>Invoice Number</label>
          <p>{invoiceNumber}</p>
        </Form.Field>
        <Form.Field>
          <label>Invoice Date</label>
          <p>{momentInvoiceDate}</p>
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Transaction Amount</label>
          <p>{formattedTransactionAmount}</p>
        </Form.Field>
      </Form.Group>
    </Form>

    const filesSegmentLoading = (!UploadedFiles.length && !FileUpload.length)
    ? ''
    : <Segment>
      <Grid divided>
        <Grid.Row columns={2} >
          <Grid.Column>
            <Item.Group divided relaxed>
              {UploadedFiles}
            </Item.Group>
          </Grid.Column>
          <Grid.Column>
            <Item.Group divided relaxed>
              {FileUpload}
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    return (
      <Container>
        <Header as='h1'>
          {M6117(transactionShow)} | {patientName} | Dr. {doctorName}
        </Header>
        {content}
        <Divider section hidden />
        <Header as='h2'>
          Files
          <Button floated='right' compact primary onClick={handleAddInput}>Add Upload</Button>
        </Header>
        {filesSegmentLoading}
      </Container>
    )
  }

  componentDidMount () {
    axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/transaction/${this.props.match.params.id}`)
    .then((res) => {
      console.log('TransactionShow res', res.data)
      this.setState({ transactionShow: res.data, mounted: true })

      return axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/file`, { params: { transaction: res.data._id } })
    })
    .then((res) => {
      console.log(res)
      this.setState({ uploadedFiles: res.data, segmentLoading: false })
    })
    .catch((err) => console.error(err))
  }
}

export default TransactionShow
