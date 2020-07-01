import React, { useContext } from "react";
import styled from "styled-components/native";

import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";

const Header = styled(TopNavigation)`
  padding: 20px 0 20px 0;
`;

const SimpleHeader = ({ navigation }) => {
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );
  return (
    <Header
      accessoryLeft={BackAction}
      title={
        <Text category="h2" onClick={() => navigation.navigate("home")}>
          Bash
        </Text>
      }
      alignment="center"
    />
  );
};

export default SimpleHeader;
