import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import * as firebaseui from "firebaseui";
import getEnv from "env";
const { firebaseConfig } = getEnv();

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.database = firebase.firestore();
    this.storage = firebase.storage();
  }

  // *** Auth API ***
  uiStart(container) {
    this.ui.start(container, {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: "invisible",
            callback: function() {
              return false;
            },
          },
          defaultCountry: "PL",
        },
      ],
    });
  }
}

const fb = new Firebase();

export default fb;
