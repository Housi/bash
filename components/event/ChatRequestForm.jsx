import React, { useContext } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Button, Layout, Text } from "@ui-kitten/components";

import { chatRequest } from "data/ChatService";
import { UserContext } from "data/UserContext";

const FormWrapper = styled(Layout)`
  display: flex;
`;

const ChatRequestForm = ({ userIdTo, onClose }) => {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();

  const { uid, user } = useContext(UserContext);
  const onSubmit = (data) => {
    chatRequest({
      ...data,
      userIdTo,
      userIdFrom: uid,
      userProfileFrom: { id: uid, ...user },
    });
    onClose();
  };

  return (
    <FormWrapper>
      <StyledTextarea name="message" defaultValue="Hey whats the details" />
      <Controller
        as={<Input multiline={true} />}
        name="message"
        control={control}
        defaultValue="Hey whats the details"
      />
      <Layout>
        <Button onPress={handleSubmit(onSubmit)}>{t("send")}</Button>
        <Button onPress={onClose}>{t("cancel")}</Button>
      </Layout>
    </FormWrapper>
  );
};

export default ChatRequestForm;
