import React, { useState, useEffect, useContext } from "react";
// import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "data/UserContext";
import { messageApi, sendMessage } from "data/MessageService";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import SimpleHeader from "components/SimpleHeader";

// const MessageBox = styled.div`
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background: pink;
//   padding: var(--space);
// `;

// const Form = styled.form`
//   width: 100%;
//   max-width: var(--content-width);
//   margin: 0 auto;
//   display: flex;
// `;

const Chat = ({ navigation, route }) => {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const { uid } = useContext(UserContext);
  const { control, handleSubmit } = useForm();

  const onSubmit = ({ message }) => {
    sendMessage({ message, chatId, userId: uid });
  };

  useEffect(() => {
    messageApi.doc(chatId).onSnapshot((doc) => {
      const msg = Object.values(doc.data());
      setMessages(msg);
    });
  }, [chatId]);

  return (
    <>
      <SimpleHeader navigation={navigation} />
      <Text>superchat</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message.content}</Text>
      ))}
      <Layout level="2">
        <Controller
          as={<Input multiline={true} />}
          name="message"
          control={control}
          defaultValue=""
        />

        <Button onPress={handleSubmit(onSubmit)}>send</Button>
      </Layout>
    </>
  );
};

export default Chat;
