import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
//firebase auth secret keys 
const firebaseConfig = {
  apiKey: "AIzaSyDEXVKMjxZ2BTOUti2Rm31KN0sKyx2iRig",
    authDomain: "teamsclone-bf126.firebaseapp.com",
    projectId: "teamsclone-bf126",
    storageBucket: "teamsclone-bf126.appspot.com",
    messagingSenderId: "455607330535",
    appId: "1:455607330535:web:4224fa53da8b87747c2442"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();