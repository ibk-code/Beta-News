import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDPhzsn1RvVF-G8uI7RJAZkmZbxfCFPDog',
  authDomain: 'am-news-7c9e8.firebaseapp.com',
  databaseURL: 'https://am-news-7c9e8.firebaseio.com',
  projectId: 'am-news-7c9e8',
  storageBucket: 'am-news-7c9e8.appspot.com',
  messagingSenderId: '1089803725276',
  appId: '1:1089803725276:web:2e994786cca6cd6bd54719'
});

//firestore intialization
let db = firebase.firestore();

export default {
  firebase,
  db
};
