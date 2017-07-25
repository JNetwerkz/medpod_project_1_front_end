import React from 'react'
import { Link } from 'react-router-dom'

import { Segment, Header, List } from 'semantic-ui-react'

import CheckboxRow from './_stageOne-checkboxRow'

const SearchResult = (props) => {
  const transactionList = props.transactionSearchResult.map((item) => {
    return (
      <CheckboxRow
        {...props}
        key={item._id}
        item={item}
      />
    )
  })
  // if (!transactionList.length) {
  //   return (
  //     <Segment className='grid__invoice-new-results'>
  //       <Header as='h4'>
  //         Search results return empty!
  //       </Header>
  //     </Segment>
  //   )
  // }
  return (
    <Segment className='grid__invoice-new-results'>
      
      <List relaxed divided selection verticalAlign='middle' size='big'>
        {transactionList}
      </List>
      <Link to={`${props.match.url}/setup`}>Next</Link>
    </Segment>
  )
}

export default SearchResult
