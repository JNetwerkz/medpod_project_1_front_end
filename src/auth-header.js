import { firebaseIdToken } from './firebase'

const AuthHeader = () => {
  console.log('authheader')
  const token = window.localStorage.getItem(firebaseIdToken)
  return {'Authorization': `Bearer ${token}`}
}

export default AuthHeader
