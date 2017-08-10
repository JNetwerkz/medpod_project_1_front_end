import React from 'react'
import { Header } from 'semantic-ui-react'

const S3Subheader = ({ text }) => {
  return (
    <Header as='h3' dividing color='blue'>
      {text}
    </Header>
  )
}

export default S3Subheader
