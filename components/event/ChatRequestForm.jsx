import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input, Button, Layout, Text, View } from "@ui-kitten/components";

import { chatRequest } from "data/ChatService";
import { UserContext } from "data/UserContext";

const FormWrapper = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonBox = styled(Layout)``;
const InputBox = styled(Input)`
  width: 70%;
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
      <InputBox
        name="message"
        multiline={true}
        defaultValue="Hey whats the details"
        onChangeText={(nextValue) => setMessage(nextValue)}
      />
      <ButtonBox>
        <Button onPress={onSubmit}>{t("send")}</Button>
        <Button appearance="outline" onPress={onClose}>
          {t("cancel")}
        </Button>
      </ButtonBox>
    </FormWrapper>
  );
};

export default ChatRequestForm;
