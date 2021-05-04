import firebase from 'firebase'

const firebaseConfig = {
        apiKey: "AIzaSyBcEby14mTGoIgQYh8mbzV_bt98SbNGnjY",
        authDomain: "reminders-91616.firebaseapp.com",
        databaseURL: "https://reminders-91616-default-rtdb.firebaseio.com",
        projectId: "reminders-91616",
        storageBucket: "reminders-91616.appspot.com",
        messagingSenderId: "414899303426",
        appId: "1:414899303426:web:1f980e13326d4c3d06631b",
        measurementId: "G-T3YMXDKW8X"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
} 

export default firebase
