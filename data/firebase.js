import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import getEnv from "env";
const { firebaseConfig } = getEnv();

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    // this.auth = firebase.auth();
    this.RecaptchaVerifier = firebase.auth.RecaptchaVerifier;
    // this.auth.useDeviceLanguage();
    this.database = firebase.firestore();
    this.storage = firebase.storage();
    this.PhoneAuthProvider = firebase.auth.PhoneAuthProvider();
    this.config = firebaseConfig;
  }
}

const fb = new Firebase();

export default fb;
