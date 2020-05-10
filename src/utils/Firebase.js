import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDD7bAwI_d8Gc6vvMfPPM9sNpNRVZ76y2M",
    authDomain: "spotyjuan-eca42.firebaseapp.com",
    databaseURL: "https://spotyjuan-eca42.firebaseio.com",
    projectId: "spotyjuan-eca42",
    storageBucket: "spotyjuan-eca42.appspot.com",
    messagingSenderId: "791328141493",
    appId: "1:791328141493:web:30bdbd8176e11847718efc"
};

export default firebase.initializeApp(firebaseConfig);