import React, { Component } from 'react'
import * as aws from 'aws-sdk'
import axios from 'axios'
import * as FileSaver from 'file-saver'

export default class TestMain extends Component {
  constructor (props) {
    super(props)
    this.handleDownload = this.handleDownload.bind(this)
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

    s3.getObject(
      { Bucket: 'testingbucket-medipod', Key: 'front-end-web-developer-interview-questions.pdf'},
      (err, data) => {
        if (err) console.log(err)
        console.log(data.Body)
        console.log(data)
        // var file = new File(data.Body, 'file.pdf', {type: 'application/pdf;charset=utf-8'})
        var file = new Blob([data.Body], {type: 'application/octet-binary'})
        // var file = new Blob(data.Body, {type: 'application/pdf;charset=utf-8'})
        FileSaver.saveAs(file, 'front-end-web-developer-interview-questions.pdf')
      }
    )
  }

  render () {
    return (
      <button onClick={this.handleDownload}>Download</button>
    )
  }
}
