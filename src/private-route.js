import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated, isGrantedAccess } from './firebase-settings'
import UnauthorisedMain from 'pages/auth/unauthorised-main'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated()
  ? isGrantedAccess(rest.path)
    ? <Route {...rest} render={(props) => <Component {...props} {...rest} />
      } />
    : <Route {...rest}
      render={props => (
        <UnauthorisedMain />
    )} />
    // : <Route {...rest}
    //   render={props => (
    //     <Redirect to={{
    //       pathname: '/unauthorised',
    //       state: { from: props.location }
    //     }} />
    // )} />
  : <Route {...rest}
    render={props => (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
}

export default PrivateRoute
