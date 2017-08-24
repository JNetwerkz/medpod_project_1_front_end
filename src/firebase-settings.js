import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID
  // storageBucket: '',
  // messagingSenderId: '539826674073'
}

const firebaseApp = firebase.initializeApp(config)

const auth = firebaseApp.auth()
const db = firebaseApp.database()
const storageKey = 'KEY_FOR_LOCAL_STORAGE'
const userEmail = 'USER_EMAIL'
const userName = 'USER_NAME'
const userType = 'USER_TYPE'
const firebaseIdToken = 'ID_TOKEN_FOR_LOCAL_STORAGE'

const userAccess = {
  master: {
    '/patient': true,
    '/transaction': true,
    '/doctor': true,
    '/hospital': true,
    '/addon': true,
    '/agent': true,
    '/invoice': true,
    '/user': true
  },
  finance: {
    '/patient': true,
    '/transaction': true,
    '/doctor': true,
    '/hospital': true,
    '/addon': true,
    '/agent': true,
    '/invoice': true,
    '/user': false
  },
  admin: {
    '/patient': true,
    '/transaction': true,
    '/doctor': true,
    '/hospital': true,
    '/addon': true,
    '/agent': true,
    '/invoice': false,
    '/user': false
  }
}

const isAuthenticated = () => {
  console.log('running isAuthenticated', auth.currentUser, window.localStorage.getItem(storageKey))
  return !!auth.currentUser || !!window.localStorage.getItem(storageKey)
}

const isGrantedAccess = (path) => {
  return userAccess[window.localStorage.getItem(userType)][path]
}

export { firebaseApp, auth, db, isAuthenticated, isGrantedAccess, storageKey, firebaseIdToken, userType, userEmail, userName}
