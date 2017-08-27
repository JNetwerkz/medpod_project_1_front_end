import React from 'react'

import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ errors }) => {
  if (!errors) return null
  let errorListArr = errors
      ? Array.isArray(errors)
        ? errors
        : Object.values(errors).map((error) => { return error.message })
      : []
  return (
    <Message
      error
      icon='warning sign'
      header='Oops! There is something wrong with your submission / action.'
      list={errorListArr} />
  )
}

export default ErrorMessage
