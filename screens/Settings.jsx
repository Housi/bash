import React, { useContext } from "react";
import ProfileForm from "components/user/ProfileForm";
import styled from "styled-components";
import { Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { UserContext } from "data/UserContext";
import SimpleHeader from "components/SimpleHeader";

const Layout = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space);
`;

const Settings = ({ navigation }) => {
  const { t } = useTranslation();
  const auth = useContext(UserContext);

  return (
    <>
      <SimpleHeader navigation={navigation} />

      <Layout>
        <ProfileForm />
        <Button onClick={auth.logout}>{t("logout")}</Button>
      </Layout>
    </>
  );
};

export default Settings;
