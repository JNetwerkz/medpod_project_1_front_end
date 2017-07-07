import { firebaseIdToken } from './firebase'
import moment from 'moment'

const AuthHeader = () => {
  const token = window.localStorage.getItem(firebaseIdToken)
  console.log('authheader token', token)
  return `Bearer ${token}`
  // return {'Authorization': `Bearer ${token}`}
}

const M6117 = (data) => {
  console.log(data)

  let cusCode = `${data['transaction month'].toString()}-${data['entry number']}-${moment(data['invoice date']).year()}`

  return cusCode
}

export { AuthHeader, M6117 }
