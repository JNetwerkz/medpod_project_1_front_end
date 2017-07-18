import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAi0FdlofJwC8Od_e1VwWiDVvMDF8VV_fw',
  authDomain: 'medpod-project-1.firebaseapp.com',
  databaseURL: 'https://medpod-project-1.firebaseio.com',
  projectId: 'medpod-project-1',
  storageBucket: '',
  messagingSenderId: '539826674073'
}

const firebaseApp = firebase.initializeApp(config)

const auth = firebaseApp.auth()
const db = firebaseApp.database()
const storageKey = 'KEY_FOR_LOCAL_STORAGE'
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
    '/invoice': true
  },
  finance: {
    '/patient': true,
    '/transaction': true,
    '/doctor': true,
    '/hospital': true,
    '/addon': true,
    '/agent': true,
    '/invoice': true
  },
  admin: {
    '/patient': true,
    '/transaction': true,
    '/doctor': true,
    '/hospital': true,
    '/addon': true,
    '/agent': true,
    '/invoice': false
  }
}

const isAuthenticated = () => {
  console.log('running isAuthenticated', auth.currentUser)
  return !!auth.currentUser || !!window.localStorage.getItem(storageKey)
}

const isGrantedAccess = (path) => {
  const typeOfUser = window.localStorage.getItem(userType)

  console.log('type of user', typeOfUser)

  if (typeOfUser) {
    console.log('here1')
    return (
      userAccess[typeOfUser][path]
    )
  } else {
    console.log('here2')
    db.ref(`/users/${window.localStorage.getItem(storageKey)}`).once('value').then((snapshot) => {
      console.log(snapshot.val())
      return userAccess[snapshot.val()][path]
    })
  }
}


export {firebaseApp, auth, db, isAuthenticated, isGrantedAccess, storageKey, firebaseIdToken, userType}
