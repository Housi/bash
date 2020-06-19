import React, { useRef, useLayoutEffect } from "react";
import fb from "data/firebase";
import { View } from "react-native";

const Login = () => {
  const authContainer = useRef(null);
  var userLang = navigator.language || navigator.userLanguage;

  useLayoutEffect(() => {
    fb.uiStart(authContainer.current);
  });

  return (
    <View>
      <Text>Login</Text>
      <View lang={userLang} ref={authContainer} />
    </View>
  );
};

export default Login;
