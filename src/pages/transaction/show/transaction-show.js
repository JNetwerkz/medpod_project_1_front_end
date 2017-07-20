import React, { Component } from 'react'

import axios from 'axios'
import moment from 'moment'
import * as fileExtension from 'file-extension'

import { Button } from 'semantic-ui-react'

import { AuthHeader, M6117, combineName } from 'custom-function'
import { s3, s3Bucket as Bucket } from 'aws'

import FileInputRow from './_fileInputRow'

class TransactionShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionShow: {},
      mounted: false,
      //
      fileTypeSelection: [
        { key: 'medicalReport', text: 'Medical Report', value: 'medical_report' },
        { key: 'invoice', text: 'Invoice', value: 'invoice' },
        { key: 'receipt', text: 'Receipt', value: 'receipt' },
        { key: 'identification', text: 'Identification Document', value: 'identification' },
        { key: 'others', text: 'Others', value: 'other' }
      ],
      files: [],
      filesStatus: []
    }

    this.handleAddInput = this.handleAddInput.bind(this)
    this.handleDeleteInput = this.handleDeleteInput.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
  }

  handleAddInput () {
    const files = this.state.files
    const filesStatus = this.state.filesStatus
    files.push({ file: '', description: '', fileType: '', uploading: false })
    // filesStatus.push({ uploading: false })

    this.setState({
      files, filesStatus
    })
  }

  handleDeleteInput (index) {
    const files = this.state.files
    files.splice(index, 1)

    this.setState({
      files
    })
  }

  handleFileUpload (index) {
    const files = this.state.files, stamp = moment().format('DDMMYYHHmmssSS')
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
    } = files[index]

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

  handleFileInputChange (event, value, index, type) {
    const files = this.state.files
    switch (type) {
      case 'fileChange':
        files[index].file = event.target.files[0] || ''
        files[index].file = event.target.files[0] || ''

        this.setState({
          files
        })
        break
      case 'descripChange':
        files[index].description = value || ''

        this.setState({
          files
        })
        break
      case 'fileTypeChange':
        files[index].fileType = value || ''

        this.setState({
          files
        })
        break
      default:
        break
    }
  }

  render () {
    if (!this.state.mounted) return <div>Loading</div>
    const FileUpload = this.state.files.map((file, index) => {
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
    return (
      <div>
        <h1>Show Transaction</h1>
        <p>{M6117(this.state.transactionShow)} {combineName(this.state.transactionShow.patient)}</p>
        <div>
          <h3>
              Uploaded Files
            </h3>
        </div>
        <div>
          <h3>
              Upload Files here
            </h3>
          <Button onClick={() => console.log(this.state.files)}>Add Upload</Button>
          <Button onClick={this.handleAddInput}>Add Upload</Button>
          {FileUpload}
        </div>
      </div>
    )
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/transaction/${this.props.match.params.id}`
    })
    .then((res) => {
      console.log('TransactionShow res', res.data)
      this.setState({ transactionShow: res.data, mounted: true })
    })
    .catch((err) => console.error(err))
  }
}

export default TransactionShow
