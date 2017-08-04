import React from 'react'

import { Button, Popup, Item, Form } from 'semantic-ui-react'

const FileRow = (props) => {
    const {
      data,
      index,
      handleFileDownload,
      handleFileDelete
    } = props

    const {
      Key,
      description,
      fileType
    } = data

  return (
    <Item>
      <Item.Content>
        <Item.Header>
          {description}
        </Item.Header>
        <Item.Meta>
          <span>{fileType}</span>
        </Item.Meta>
        <Item.Description>
          <Form>
            <Popup
              // open
              trigger={<Button type='button' compact negative>Delete</Button>}
              children={
                <div>
                  <p>Confirm delete?</p>
                  <Button onClick={() => handleFileDelete(index)}>Yes</Button>
                </div>
              }
              on='click'
            />
            <Button type='button' compact positive onClick={() => handleFileDownload(index)}>
              Download
            </Button>
          </Form>
        </Item.Description>
        {/* <Item.Description>{Key}</Item.Description> */}
      </Item.Content>
    </Item>
  )
}

export default FileRow
