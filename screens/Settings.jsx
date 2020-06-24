import React, { useContext } from "react";
import ProfileForm from "components/user/ProfileForm";
import styled from "styled-components/native";
import { Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { UserContext } from "data/UserContext";
import SimpleHeader from "components/SimpleHeader";
import { SPACE } from "theme";

const Layout = styled.View`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: ${SPACE};
`;

const Settings = ({ navigation }) => {
  const { t } = useTranslation();
  const auth = useContext(UserContext);

  return (
    <>
      <SimpleHeader navigation={navigation} />

      <Layout>
        <ProfileForm />
        <Button onPress={() => auth.logout}>{t("logout")}</Button>
      </Layout>
    </>
  );
};

export default Settings;
