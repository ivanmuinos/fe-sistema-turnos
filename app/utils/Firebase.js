import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC6Gwoewi2okzNC6SmFH3LeJnsTVeueULg",
    authDomain: "sistema-turnos-medicos.firebaseapp.com",
    databaseURL: "https://sistema-turnos-medicos.firebaseio.com",
    projectId: "sistema-turnos-medicos",
    storageBucket: "sistema-turnos-medicos.appspot.com",
    messagingSenderId: "854364808392",
    appId: "1:854364808392:web:54ee0bcfbcb4b4174071fd"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);

