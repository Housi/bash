import React, { useRef, useLayoutEffect } from "react";
import fb from "data/firebase";

export default function FirebaseRecaptcha({ onVerify }) {
  const recaptchaContainer = useRef();

  useLayoutEffect(() => {
    console.log("kk");
    window.recaptchaVerifier = new fb.RecaptchaVerifier(
      recaptchaContainer.current,
      {
        size: "invisible",
        callback: function(response) {
          console.log("response");
          onVerify(response);
        },
        "expired-callback": function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
    onVerify(window.recaptchaVerifier);
  }, []);

  return <div ref={recaptchaContainer} />;
}
