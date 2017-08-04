import React from 'react'

import { Button, Popup, Item, Form, Divider } from 'semantic-ui-react'

import moment from 'moment'

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
      fileType,
      createdAt
    } = data

  const momentCreatedAt = moment(createdAt).format('DD MMM YYYY, h:mma')
  return (
    <Item>
      <Item.Content>
        <Item.Header>
          {Key}
        </Item.Header>
        <Item.Meta>
          <span>{fileType}</span>
        </Item.Meta>
        <Item.Description>
          {description}
        </Item.Description>
        <Item.Extra>{momentCreatedAt}</Item.Extra>
        {/* <Item.Description>{Key}</Item.Description> */}
        <Divider hidden />
        <Form>
          <Button type='button' compact positive onClick={() => handleFileDownload(index)}>
            Download
          </Button>
          <Popup
            // open
            trigger={<Button type='button' color='red' basic compact>Delete</Button>}
            children={
              <div>
                <p>Confirm delete?</p>
                <Button fluid compact color='red' onClick={() => handleFileDelete(index)}>Yes</Button>
              </div>
            }
            on='click'
          />
        </Form>
      </Item.Content>

    </Item>
  )
}

export default FileRow
