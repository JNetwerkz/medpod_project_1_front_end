import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from './firebase-settings'

const RedirectFromLoginRoute = ({ component: Component, ...rest }) => {
  return !isAuthenticated()
    ? <Route {...rest} render={(props) => <Component {...props} {...rest} />
      } />
    : <Route {...rest}
      render={props => (
        <Redirect to={{
          pathname: '/patient',
          state: { from: props.location }
        }} />
    )} />
}

export default RedirectFromLoginRoute
