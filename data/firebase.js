import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import getEnv from "env";
const { firebaseConfig } = getEnv();

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.auth = firebase.auth();
    this.RecaptchaVerifier = firebase.auth.RecaptchaVerifier;
    this.PhoneAuthProvider = firebase.auth.PhoneAuthProvider();
    // this.auth.useDeviceLanguage();
    this.database = firebase.firestore();
    this.storage = firebase.storage();
    this.config = firebaseConfig;
  }
}

const fb = new Firebase();

export default fb;
