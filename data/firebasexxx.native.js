import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/storage";

import getEnv from "env";
const { firebaseConfig } = getEnv();

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    // this.auth = firebase.auth();
    // this.RecaptchaVerifier = firebase.auth.RecaptchaVerifier;
    // this.auth.useDeviceLanguage();
    this.database = firebase.firestore();
    this.storage = firebase.storage();

    this.config = firebaseConfig;
    this.PhoneAuthProvider = firebase.auth.PhoneAuthProvider();
  }
}

const fb = new Firebase();

export default fb;
