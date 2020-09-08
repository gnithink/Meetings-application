import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyD6m6pw33qXaKhtCeVxf1Scuh1lmItk0jI",
  authDomain: "react-spas-b15f8.firebaseapp.com",
  databaseURL: "https://react-spas-b15f8.firebaseio.com",
  projectId: "react-spas-b15f8",
  storageBucket: "react-spas-b15f8.appspot.com",
  messagingSenderId: "946289064956",
  appId: "1:946289064956:web:259ca5ce32a02d085e1079",
  measurementId: "G-XEGNKE8161"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;