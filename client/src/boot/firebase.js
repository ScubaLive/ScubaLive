// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import DiveTable from '../components/DivePlan/divetable'
import SurfaceTable from '../components/DivePlan/surfacetable'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA6JWwq3lyKJPt-GJclm8nurzYv2xlHqUU',
  authDomain: 'scubalive-cbadb.firebaseapp.com',
  databaseURL: 'https://scubalive-cbadb.firebaseio.com',
  projectId: 'scubalive-cbadb',
  storageBucket: 'scubalive-cbadb.appspot.com',
  messagingSenderId: '853965370355',
  appId: '1:853965370355:web:40766fb213442356c61886',
  measurementId: 'G-3W0LJ93MP9'
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)

let divet = new DiveTable()
let surfacet = new SurfaceTable()

let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb, divet, surfacet }
