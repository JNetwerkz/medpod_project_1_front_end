import React from 'react'
import { Button } from 'semantic-ui-react'

const EditButton = (props) => {
  const { handleUpdateSubmit, notEditing } = props
  const editButton = notEditing
  ? null
  : <Button floated='right' onClick={handleUpdateSubmit} positive>
      Confirm
    </Button>
  return editButton
}

export default EditButton
