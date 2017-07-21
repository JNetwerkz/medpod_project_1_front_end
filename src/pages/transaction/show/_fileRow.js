import React from 'react'

import { Button, Popup } from 'semantic-ui-react'

const FileRow = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.data.Key}</p>
      <p>{props.data.description}</p>
      <li>
        <Button onClick={() => props.handleFileDownload(props.index)}>
          Download
        </Button>
        <Popup
          // open
          trigger={<Button>Delete</Button>}
          children={
            <div>
              <p>Confirm delete?</p>
              <Button onClick={() => props.handleFileDelete(props.index)}>Yes</Button>
            </div>
          }
          on='click'
        />
      </li>
    </div>
  )
}

export default FileRow
