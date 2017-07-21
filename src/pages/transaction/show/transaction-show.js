import React, { Component } from 'react'

import axios from 'axios'
import moment from 'moment'
import * as fileExtension from 'file-extension'
import * as FileSaver from 'file-saver'

import { Button } from 'semantic-ui-react'

import { AuthHeader, M6117, combineName } from 'custom-function'
import { s3, s3Bucket as Bucket } from 'aws'

import FileInputRow from './_fileInputRow'
import FileRow from './_fileRow'

class TransactionShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionShow: {},
      uploadedFiles: [],
      mounted: false,
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
    const uploadedFiles = this.state.uploadedFiles
    const { Key } = uploadedFiles[index]
    const downloadPromise = s3.getObject({ Bucket, Key }).promise()

    return downloadPromise
    .then((res) => {
      const file = new Blob([ res.Body ])
      return FileSaver.saveAs(file, Key)
    })
  }

  handleFileDelete (index) {
    const uploadedFiles = this.state.uploadedFiles
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
  }

// adds <input> to upload file
  handleAddInput () {
    const filesToUpload = this.state.filesToUpload
    const filesStatus = this.state.filesStatus
    filesToUpload.push({ file: '', description: '', fileType: '', uploading: false })
    // filesStatus.push({ uploading: false })

    this.setState({
      filesToUpload, filesStatus
    })
  }

  handleDeleteInput (index) {
    const filesToUpload = this.state.filesToUpload
    filesToUpload.splice(index, 1)

    this.setState({
      filesToUpload
    })
  }

// handles uploading of file
  handleFileUpload (index) {
    const filesToUpload = this.state.filesToUpload, stamp = moment().format('DDMMYYHHmmssSS')
    const {
      _id: transactionId,
      patient: { _id: patientId },
      'receiving_doctor': { _id: doctorId }
    } = this.state.transactionShow

    const {
      description,
      file,
      fileType,
      file: { name: fileName }
    } = filesToUpload[index]

    const Key = `${patientId}_${fileType || ''}_${stamp}.${fileExtension(fileName)}`

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
            const uploadedFiles = this.state.uploadedFiles
            uploadedFiles.unshift(res.data)
            filesToUpload.splice(index, 1)

            this.setState({ uploadedFiles, filesToUpload })
          }
        })
    )
  }

  // handleAllFileUpload () {
  //   const patientId = this.state.transactionShow.patient._id
  //   const files = this.state.files
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
    const filesToUpload = this.state.filesToUpload
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
    if (!this.state.mounted) return <div>Loading</div>
    const FileUpload = this.state.filesToUpload.map((file, index) => {
      return <FileInputRow
        key={`upload-${index}`}
        data={file}
        index={index}
        handleChange={this.handleFileInputChange}
        handleDeleteInput={this.handleDeleteInput}
        handleFileUpload={this.handleFileUpload}
        fileTypeSelection={this.state.fileTypeSelection}
      />
    })
    const UploadedFiles = this.state.uploadedFiles.map((file, index) => {
      return <FileRow
        data={file}
        key={file._id}
        index={index}
        handleFileDownload={this.handleFileDownload}
        handleFileDelete={this.handleFileDelete}
      />
    })
    return (
      <div>
        <h1>Show Transaction</h1>
        <p>{M6117(this.state.transactionShow)} {combineName(this.state.transactionShow.patient)}</p>
        <div>
          <h3>
              Uploaded Files
            </h3>
            {UploadedFiles}
        </div>
        <div>
          <h3>
              Upload Files here
            </h3>
          <Button onClick={() => console.log(this.state.filesToUpload)}>Add Upload</Button>
          <Button onClick={this.handleAddInput}>Add Upload</Button>
          {FileUpload}
        </div>
      </div>
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
      this.setState({ uploadedFiles: res.data })
    })
    .catch((err) => console.error(err))
  }
}

export default TransactionShow
