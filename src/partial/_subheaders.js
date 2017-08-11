import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

const S3Subheader = ({ text }) => {
  return (
    <div>
      <Divider section hidden />
      <Header as='h3' dividing color='blue'>
        {text}
      </Header>
      <Divider hidden />
    </div>
  )
}

export default S3Subheader
