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
const storageKey = 'KEY_FOR_LOCAL_STORAGE'

const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey)
}

export {firebaseApp, auth, isAuthenticated, storageKey}
