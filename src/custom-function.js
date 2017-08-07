import { firebaseIdToken } from './firebase-settings'
import moment from 'moment'

const AuthHeader = () => {
  const token = window.localStorage.getItem(firebaseIdToken)
  // console.log('authheader token', token)
  return `Bearer ${token}`
  // return {'Authorization': `Bearer ${token}`}
}

const M6117 = (data) => {
  let cusCode = `M${data['transaction month'].toString()}.${data['entry number']}.${moment(data['invoice date']).format('YY')}`

  return cusCode
}

const combineName = (obj) => {
  let firstName = obj['first name'] ? obj['first name'] : ''
  let lastName = obj['last name'] ? obj['last name'] : ''
  return `${firstName} ${lastName}`
}

const monthsSelectOption = [
  { key: '', text: '', value: '' },
  { key: 'jan', text: 'January', value: 1 },
  { key: 'feb', text: 'February', value: 2 },
  { key: 'mar', text: 'March', value: 3 },
  { key: 'apr', text: 'April', value: 4 },
  { key: 'may', text: 'May', value: 5 },
  { key: 'jun', text: 'June', value: 6 },
  { key: 'jul', text: 'July', value: 7 },
  { key: 'aug', text: 'August', value: 8 },
  { key: 'sep', text: 'September', value: 9 },
  { key: 'oct', text: 'October', value: 10 },
  { key: 'nov', text: 'November', value: 11 },
  { key: 'dec', text: 'December', value: 12 }
]

const genderOption = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Others', value: 'others' }
]

const uploadFileOption = [
        { key: 'medicalReport', text: 'Medical Report', value: 'medical report' },
        { key: 'invoice', text: 'Invoice', value: 'invoice' },
        { key: 'receipt', text: 'Receipt', value: 'receipt' },
        { key: 'identification', text: 'Identification Document', value: 'identification' },
        { key: 'others', text: 'Others', value: 'other' }
]

const accessType = [
  { key: 'master', text: 'Master', value: 'master' },
  { key: 'admin', text: 'Admin Staff', value: 'admin' },
  { key: 'finance', text: 'Finance Staff', value: 'finance' }
]

export { AuthHeader, M6117, combineName, monthsSelectOption, genderOption, uploadFileOption, accessType }
