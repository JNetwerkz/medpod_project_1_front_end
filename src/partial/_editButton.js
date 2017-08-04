import React from 'react'
import { Button } from 'semantic-ui-react'

const EditButton = (props) => {
  const { handleEditState, notEditing } = props
  const editButton = notEditing
  ? <Button type='button' primary floated='right' onClick={handleEditState}>Edit</Button>
  : <Button type='button' primary basic floated='right' onClick={handleEditState}>Cancel</Button>
  return editButton
}

export default EditButton
