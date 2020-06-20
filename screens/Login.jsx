import React, { useRef, useState } from "react";
import fb from "data/firebase";
import { View, TextInput, Platform } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import FirebaseRecaptcha from "utils/FirebaseReCaptcha";

const Login = () => {
  const recaptchaRef = useRef(null);
  const [verificationId, setVerificationId] = useState(null);

  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [reCaptcha, setReCaptcha] = useState();

  // Handle the button press
  async function signInWithPhoneNumber() {
    const vId = await fb.PhoneAuthProvider.verifyPhoneNumber(phone, reCaptcha);
    setVerificationId(vId);
  }

  async function confirmCode() {
    const credential = fb.PhoneAuthProvider.credential(verificationId, code);
    const authResult = await fb.auth.signInWithCredential(credential);
  }

  if (!confirm) {
    return (
      <>
        <Text>Login</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Your phone"
        />
        <Button title="Send SMS" onPress={() => signInWithPhoneNumber()} />

        <FirebaseRecaptcha
          // onError={this.onError}
          onVerify={(token) => {
            setReCaptcha(token);
          }}
          firebaseConfig={fb.config}
        />
      </>
    );
  }

  return (
    <>
      <Input value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};

export default Login;
