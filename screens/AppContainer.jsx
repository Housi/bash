import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { UserContext } from "data/UserContext";

import Home from "screens/Home";
import Login from "screens/Login";
import Chats from "screens/Chats";
import Chat from "screens/Chat";

import Loader from "components/ui/Loader";
import Settings from "screens/Settings";

const AppContainer = () => {
  const { Navigator, Screen } = createStackNavigator();
  const auth = useContext(UserContext);

  if (!auth.ready) return <Loader />;
  if (!auth.uid) return <Login />;

  if (!auth.user.name) return <Settings />;

  return (
    <>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <Navigator headerMode="none" initialRouteName="home">
          <Screen
            name="home"
            component={Home}
            // options={{ header: (props) => <Header {...props} /> }}
          />
          <Screen
            name="settings"
            component={Settings}
            // options={{ headerTitle: () => <Header /> }}
          />
          <Screen
            name="chats"
            component={Chats}
            // options={{ headerTitle: () => <Header /> }}
          />
          <Screen
            name="chat"
            component={Chat}
            // options={{ headerTitle: () => <Header /> }}
          />
        </Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppContainer;
