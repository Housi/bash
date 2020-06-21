import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Button, Layout, Text, View } from "@ui-kitten/components";

import { chatRequest } from "data/ChatService";
import { UserContext } from "data/UserContext";

const FormWrapper = styled.View`
  display: flex;
`;

const ChatRequestForm = ({ userIdTo, onClose }) => {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  const { uid, user } = useContext(UserContext);
  const onSubmit = () => {
    chatRequest({
      message,
      userIdTo,
      userIdFrom: uid,
      userProfileFrom: { id: uid, ...user },
    });
    onClose();
  };

  return (
    <FormWrapper>
      {/* <StyledTextarea name="message" defaultValue="Hey whats the details" /> */}
      <Input
        name="message"
        multiline={true}
        defaultValue="Hey whats the details"
        onChangeText={(nextValue) => setMessage(nextValue)}
      />
      {/* <Controller
        as={<Input multiline={true} />}
        name="message"
        control={control}
        defaultValue="Hey whats the details"
      /> */}
      <Layout>
        <Button onPress={onSubmit}>{t("send")}</Button>
        <Button onPress={onClose}>{t("cancel")}</Button>
      </Layout>
    </FormWrapper>
  );
};

export default ChatRequestForm;
