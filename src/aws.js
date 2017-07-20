import * as AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1'
})

const s3 = new AWS.S3()
const s3Bucket = process.env.REACT_APP_AWS_S3_BUCKET

export { s3, s3Bucket }
