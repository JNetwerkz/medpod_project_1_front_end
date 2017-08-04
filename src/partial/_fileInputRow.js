import React from 'react'

import { Form, Input, Button, Dropdown, Item } from 'semantic-ui-react'

const FileInputRow = (props) => {
  console.log(props)
  return (
    <Item>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>File Type</label>
            <Dropdown
              options={props.fileTypeSelection}
              placeholder='Choose file type'
              search
              selection
              value={props.data.fileType}
              onChange={(event, { value }) => props.handleChange(event, value, props.index, 'fileTypeChange')}
            />
          </Form.Field>
          <Form.Field>
            <label>Choose File</label>
            <Input type='file'
              onChange={
                (event, {value}) => props.handleChange(event, value, props.index, 'fileChange')
              } />
            </Form.Field>
          </Form.Group>
          <Form.TextArea autoHeight placeholder='IE: Invoice from Mount Elizabeth..'
            label='Name / Description'
            value={props.data.description}
            onChange={
              (event, {value}) =>
              props.handleChange(event, value, props.index, 'descripChange')
            } />
            <Button compact negative onClick={() => props.handleDeleteInput(props.index)}>Remove</Button>
            <Button compact positive onClick={() => props.handleFileUpload(props.index)}>Upload</Button>
          </Form>
    </Item>
  )
}

export default FileInputRow
