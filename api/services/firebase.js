const firebase = require('firebase/app');
require('firebase/auth');

const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

const firebaseConfig = {
    apiKey: "AIzaSyCRGKef7xpvapCi46BKV618tIW604H6om0",
    authDomain: "abandono-zer0.firebaseapp.com",
    projectId: "abandono-zer0",
    storageBucket: "abandono-zer0.appspot.com",
    messagingSenderId: "1008941082765",
    appId: "1:1008941082765:web:f32e37c850c0cffec89ac4",
    measurementId: "G-XJ3DJK1MWT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { firebase, admin };
