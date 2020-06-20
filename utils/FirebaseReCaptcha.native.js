import React, { useRef, useLayoutEffect } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const FirebaseReCaptcha = ({ onVerify, firebaseConfig }) => {
  const recaptchaVerifier = useRef();

  useLayoutEffect(() => {
    onVerify(recaptchaVerifier.current);
  }, [recaptchaVerifier]);

  return (
    <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
      firebaseConfig={firebaseConfig}
    />
  );
};

export default FirebaseReCaptcha;
