import React from 'react'

import { Segment, Dimmer, Loader } from 'semantic-ui-react'

const Loading = (props) => {
  return (
    <Segment style={{height: '100vh'}}>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    </Segment>
  )
}

export default Loading
