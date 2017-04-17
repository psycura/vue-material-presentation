import Vue from 'vue';

import firebase from 'firebase';
import VueFire from 'vuefire';

Vue.use ( VueFire );

const config = {
    apiKey            : "AIzaSyBtLedfD9QXM-fnVw4HQVbhLVrUGyE6kcc",
    authDomain        : "material-presentation.firebaseapp.com",
    databaseURL       : "https://material-presentation.firebaseio.com",
    projectId         : "material-presentation",
    storageBucket     : "material-presentation.appspot.com",
    messagingSenderId : "192428830320"
};

firebase.initializeApp ( config );

const dbRef = firebase.database ();
const auth  = firebase.auth ();
export  { dbRef, auth };



