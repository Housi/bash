import React, { useContext } from "react";
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";

const SimpleHeader = ({ navigation }) => {
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );
  return (
    <TopNavigation
      accessoryLeft={BackAction}
      title={<Text onClick={() => navigation.navigate("home")}>Bash</Text>}
      alignment="center"
    />
  );
};

export default SimpleHeader;
