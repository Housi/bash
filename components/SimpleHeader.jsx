import React, { useContext } from "react";
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

const SimpleHeader = ({ navigation }) => {
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );
  return (
    <TopNavigation accessoryLeft={BackAction} title="Bash" alignment="center" />
  );
};

export default SimpleHeader;
