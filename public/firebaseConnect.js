// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDeP4ALp3ruga8OaDeKpOFZgT-O3l9Gjw4",
    authDomain: "valenitn-music.firebaseapp.com",
    databaseURL: "https://valenitn-music.firebaseio.com",
    projectId: "valenitn-music",
    storageBucket: "valenitn-music.appspot.com",
    messagingSenderId: "180826074845",
    appId: "1:180826074845:web:bb10e446d587815ee0b534"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.database();
var storage = firebase.app().storage("gs://valenitn-music.appspot.com");	