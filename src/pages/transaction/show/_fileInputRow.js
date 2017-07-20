import React from 'react'

import { Form, Input, Button, TextArea, Dropdown } from 'semantic-ui-react'

const FileInputRow = (props) => {
  console.log(props)
  return (
    <div>
      <Input type='file'
        onChange={
          (event, {value}) => props.handleChange(event, value, props.index, 'fileChange')
        } />
      <Form onSubmit={(e) => e.preventDefault()}>
        <TextArea autoHeight placeholder='Add Description'
          value={props.data.description}
          onChange={
          (event, {value}) =>
          props.handleChange(event, value, props.index, 'descripChange')
        } />
      </Form>
      <Dropdown
        options={props.fileTypeSelection}
        placeholder='Choose file type'
        search
        selection
        value={props.data.fileType}
        onChange={(event, { value }) => props.handleChange(event, value, props.index, 'fileTypeChange')}
      />
      <Button onClick={() => props.handleDeleteInput(props.index)}>Remove</Button>
      <Button onClick={() => props.handleFileUpload(props.index)}>Upload</Button>
    </div>
  )
}

export default FileInputRow
