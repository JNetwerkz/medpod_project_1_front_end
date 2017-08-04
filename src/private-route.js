import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated, isGrantedAccess } from './firebase-settings'

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(rest.path)
  return isAuthenticated()
  ? isGrantedAccess(rest.path)
    ? <Route {...rest} render={(props) => <Component {...props} {...rest} />
      } />
    : <Route {...rest}
      render={props => (
        <Redirect to={{
          pathname: '/unauthorised',
          state: { from: props.location }
        }} />
    )} />
  : <Route {...rest}
    render={props => (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
  // if (isAuthenticated()) {
  //   if (isGrantedAccess(rest.path)) {
  //     return <Route {...rest} render={(props) => <Component {...props} {...rest} />
  //       } />
  //     } else {
  //       return <Route {...rest}
  //         render={props => (
  //           <Redirect to={{
  //             pathname: '/unauthorised',
  //             state: { from: props.location }
  //           }} />
  //       )} />
  //      }
  // } else {
  //   return <Route {...rest}
  //     render={props => (
  //       <Redirect to={{
  //         pathname: '/login',
  //         state: { from: props.location }
  //       }} />
  //   )} />
  // }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     isAuthenticated() ? (
//       <Component {...props} {...rest} />
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }} />
//     )
//   )} />
// )

export default PrivateRoute
