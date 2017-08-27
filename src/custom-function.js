import { firebaseIdToken } from './firebase-settings'
import moment from 'moment'

const AuthHeader = () => {
  const token = window.localStorage.getItem(firebaseIdToken)
  return `Bearer ${token}`
}

const M6117 = (data) => {
  const {
    'transaction month': transactionMonth,
    'entry number': entryNumber,
    'invoice date': invoiceDate
  } = data

  let _transactionMonth = transactionMonth
  ? transactionMonth.toString()
  : ''
  let _entryNumber = entryNumber || ''
  let _invoiceDate = invoiceDate
  ? moment(invoiceDate).format('YY')
  : ''

  let cusCode = `M${_transactionMonth}.${_entryNumber}.${_invoiceDate}`

  return cusCode
}

const combineName = (obj) => {
  if (!obj) return ''
  let firstName = obj['first name'] ? obj['first name'] : ''
  let lastName = obj['last name'] ? obj['last name'] : ''
  return `${firstName} ${lastName}`
}
const invoiceNumberGetter = ({ invoiceNumber, yearCreated }) => {
  const _invoiceNumber = invoiceNumber || ''
  const _yearCreated = yearCreated || ''

  return `MP${_yearCreated}${_invoiceNumber}`
}

const monthsSelectOption = [
  { key: 'empty', text: 'Clear Month', value: '' },
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
  // { key: 'master', text: 'Master', value: 'master' },
  { key: 'admin', text: 'Admin Staff', value: 'admin' },
  { key: 'finance', text: 'Finance Staff', value: 'finance' }
]

const invoiceStatusType = [
  { key: 'Interim Bill', text: 'Interim Bill', value: 'Interim Bill' },
  { key: 'Final Tax Invoice (FIT)', text: 'Final Tax Invoice (FIT)', value: 'Final Tax Invoice (FIT)' },
  { key: 'Bill Collection (BillC)', text: 'Bill Collection (BillC)', value: 'Bill Collection (BillC)' },
  { key: 'Distributor Fee (DF)', text: 'Distributor Fee (DF)', value: 'Distributor Fee (DF)' },
  { key: 'Query Bill / Email Bill (QB / EB)', text: 'Query Bill / Email Bill (QB / EB)', value: 'Query Bill / Email Bill (QB / EB)' },
  { key: 'Proforma (PF)', text: 'Proforma (PF)', value: 'Proforma (PF)' },
  { key: 'Invoiced (INV)', text: 'Invoiced (INV)', value: 'Invoiced (INV)' },
  { key: 'Paid and Archive', text: 'Paid and Archive', value: 'Paid and Archive' },
  { key: 'VOID', text: 'VOID', value: 'VOID' }
]

export { AuthHeader, M6117, combineName, invoiceNumberGetter, monthsSelectOption, genderOption, uploadFileOption, accessType, invoiceStatusType }
