import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { UserContext } from "data/UserContext";
import { messageApi, sendMessage } from "data/MessageService";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import SimpleHeader from "components/SimpleHeader";
import { SPACE, CONTENT_WIDTH } from "theme";
import { ScrollView } from "react-native-gesture-handler";

const MessageBox = styled.View`
  background: pink;
  padding: ${SPACE};
`;

const Form = styled.View`
  width: 100%;
  max-width: ${CONTENT_WIDTH};
  margin: 0 auto;
  display: flex;
`;

const Box = styled.ScrollView`
  padding: 17px;
`;

const Chat = ({ navigation, route }) => {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { uid } = useContext(UserContext);

  const onSubmit = () => {
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
      <Box>
        <Text category="h3">superchat</Text>
        {messages.map((message, index) => (
          <Text key={index}>{message.content}</Text>
        ))}
        <Form>
          <MessageBox>
            <Input onChangeText={(nextValue) => setMessage(nextValue)} />
            <Button onPress={onSubmit}>send</Button>
          </MessageBox>
        </Form>
      </Box>
    </>
  );
};

export default Chat;
