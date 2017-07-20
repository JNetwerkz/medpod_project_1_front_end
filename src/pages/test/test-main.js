import React, { Component } from 'react'
import * as aws from 'aws-sdk'
import axios from 'axios'
import * as FileSaver from 'file-saver'

import { Input } from 'semantic-ui-react'

export default class TestMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: []
    }
    this.handleDownload = this.handleDownload.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload (event, data) {
    console.log(event.target.files[0])
    aws.config.update(
      {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: 'ap-southeast-1'
      }
    )

    const s3 = new aws.S3()

    let params = {
      Body: event.target.files[0],
      Bucket: 'testingbucket-medipod',
      Key: 'Testing.pdf'
    }

    const promise = s3.putObject(params).promise()

    promise
    .then((data) => {
      console.log(data)
    })
  }

  handleAdd (event) {
    const file = event.target.files[0]

    const files = this.state.files

    files.push(file)
  }

  handleDownload () {
    // axios({
    //   method: 'GET',
    //   url: `${process.env.REACT_APP_API_ENDPOINT}/transaction/download`
    // })
    // .then((res) => {
    //   console.log(res)
    //   var file = new File(res.data, 'file')
    //   FileSaver.saveAs(file)
    // })
    // .catch((err) => console.error(err))
    aws.config.update(
      {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: 'ap-southeast-1'
      }
    )

    const s3 = new aws.S3()
    console.log(s3)

    var fileKey = 'front-end-web-developer-interview-questions.pdf'
    var fileKey2 = 'General Assembly-88.jpg'

    s3.getObject(
      { Bucket: 'testingbucket-medipod', Key: fileKey2},
      (err, data) => {
        if (err) console.log(err)
        console.log(data.Body)
        console.log(data)
        // var file = new File(data.Body, 'file.pdf', {type: 'application/pdf;charset=utf-8'})
        var file = new Blob([data.Body], {type: 'application/octet-binary'})
        // var file = new Blob(data.Body, {type: 'application/pdf;charset=utf-8'})
        FileSaver.saveAs(file, fileKey2)
      }
    )
  }

  render () {
    return (
      <div>
        <button onClick={this.handleDownload}>Download</button>
        <Input type='file' onChange={(event, data) => this.handleUpload(event, data)} />
        <Input type='file' onChange={(event, data) => this.handleUpload(event, data)} />
        <button>Upload</button>
      </div>
    )
  }
}
