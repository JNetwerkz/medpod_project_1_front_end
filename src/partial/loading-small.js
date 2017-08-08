import React from 'react'

import { Segment, Dimmer, Loader } from 'semantic-ui-react'

const LoadingSmall = (props) => {
  return (
    <Loader active inline='centered' />
    // <Segment>
    //   <Dimmer active>
    //     <Loader size='massive'>Loading</Loader>
    //   </Dimmer>
    // </Segment>
  )
}

export default LoadingSmall
