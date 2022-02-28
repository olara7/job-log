import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA2ZW81CLoXhtYywhDI1DGflFqhDh_yfI8",
    authDomain: "joblog-ef61d.firebaseapp.com",
    projectId: "joblog-ef61d",
    storageBucket: "joblog-ef61d.appspot.com",
    messagingSenderId: "31952467862",
    appId: "1:31952467862:web:8b0ee36c880928ca794fb7"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init service
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }