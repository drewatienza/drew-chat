import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCe0DloNR_oak29e8Qk4WAwkpmYEKmbk1I",
  authDomain: "chat-web-app-58ab8.firebaseapp.com",
  databaseURL: "https://chat-web-app-58ab8.firebaseio.com",
  projectId: "chat-web-app-58ab8",
  storageBucket: "chat-web-app-58ab8.appspot.com",
  messagingSenderId: "988512455135",
  appId: "1:988512455135:web:eb69e584ae86314beddc6a"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
