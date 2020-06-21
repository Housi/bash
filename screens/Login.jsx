import React, { useRef, useState } from "react";
import fb from "data/firebase";
import { View, TextInput, Platform } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import FirebaseRecaptcha from "utils/FirebaseReCaptcha";

const Login = () => {
  const recaptchaRef = useRef(null);
  const [verificationId, setVerificationId] = useState();

  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [reCaptcha, setReCaptcha] = useState();

  // Handle the button press
  async function signInWithPhoneNumber() {
    const vId = await fb.auth.signInWithPhoneNumber(phone, reCaptcha);
    console.log("vid");
    console.log(vId);
    setVerificationId(vId);
  }

  const confirmCode = () => {
    if (!verificationId) return;
    console.log(verificationId);
    console.log("verificationId");

    verificationId.confirm(code);
    // const authResult = await fb.auth.signInWithCredential(credential);
  };

  if (!verificationId) {
    return (
      <>
        <Text>Login</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Your phone"
        />
        <Button onPress={() => signInWithPhoneNumber()}>Send SMS</Button>

        <FirebaseRecaptcha
          // onError={this.onError}
          onVerify={(rc) => {
            console.log(rc);
            setReCaptcha(rc);
          }}
          firebaseConfig={fb.config}
        />
      </>
    );
  }

  return (
    <>
      <Input value={code} onChangeText={(text) => setCode(text)} />
      <Button onPress={() => confirmCode()}>Confirm Code</Button>
    </>
  );
};

export default Login;
