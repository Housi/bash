import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, StatusBar } from "react-native";
import { UserContext } from "data/UserContext";

import Home from "screens/Home";
import Login from "screens/Login";
import Chats from "screens/Chats";
import Chat from "screens/Chat";
import Settings from "screens/Settings";

import { Spinner } from "@ui-kitten/components";

const AppContainer = () => {
  const { Navigator, Screen } = createStackNavigator();
  const auth = useContext(UserContext);

  if (!auth.ready) return <Spinner />;
  else if (!auth.uid) return <Login />;

  if (!auth.user.name) return <Settings />;

  return (
    <>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <Navigator headerMode="none" initialRouteName="home">
          <Screen name="home" component={Home} />
          <Screen name="settings" component={Settings} />
          <Screen name="chats" component={Chats} />
          <Screen name="chat" component={Chat} />
        </Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppContainer;
