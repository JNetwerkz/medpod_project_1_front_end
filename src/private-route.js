import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from './firebase'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
)
export default PrivateRoute