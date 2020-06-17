import firebase from "firebase";
import "firebase/auth";
 var firebaseConfig = {
    apiKey: "AIzaSyDCVMssBwRLHMusFGUQJJls91mILIsGKgU",
    authDomain: "sem4-4d071.firebaseapp.com",
    databaseURL: "https://sem4-4d071.firebaseio.com",
    projectId: "sem4-4d071",
    storageBucket: "sem4-4d071.appspot.com",
    messagingSenderId: "257644773088",
    appId: "1:257644773088:web:d859e8437b793f02ef1a85",
    measurementId: "G-2S99LGPG3F"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);