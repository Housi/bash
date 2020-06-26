import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, ScrollView } from "react-native";
import { chatApi, acceptChat, rejectChat } from "data/ChatService";
import { otherProfile, UserContext } from "data/UserContext";
import { Button, Text, Layout } from "@ui-kitten/components";
import { BOX_BORDER } from "theme";

import SimpleHeader from "components/SimpleHeader";

const ChatBox = styled.View`
  border: ${BOX_BORDER};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FriendImage = styled.Image`
  width: 50px;
  height: 50px;
`;
const ButtonBox = styled(Layout)`
  display: flex;
  flex-direction: row;
`;

const ChatsBox = styled(ScrollView)`
  margin: 15px;
`;

const Message = styled(Text)`
  margin: 5px;
`;

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    chatApi
      .where("users", "array-contains", uid)
      .onSnapshot((querySnapshot) => {
        const chats = [];
        querySnapshot.forEach(function (doc) {
          chats.push({ id: doc.id, ...doc.data() });
        });
        setChats(chats);
      });
  }, [uid]);

  const openChat = (status, id) => {
    if (status === "accepted")
      navigation.navigate("chat", {
        chatId: id,
      });
  };

  return (
    <>
      <SimpleHeader navigation={navigation} />
      <ChatsBox>
        {chats.map(({ id, lastMessage, status, profiles }) => {
          const friend = otherProfile(profiles);
          return (
            <TouchableOpacity onPress={() => openChat(status, id)} key={id}>
              <ChatBox level="1">
                <FriendImage source={{ uri: friend.photoUrl }} alt="friend" />
                <Message>{lastMessage.content}</Message>
                {status === "pending" && (
                  <ButtonBox>
                    <Button
                      size="small"
                      onPress={() => acceptChat({ id, message: lastMessage })}
                    >
                      accept
                    </Button>
                    <Button
                      size="small"
                      onPress={() => rejectChat(id)}
                      appearance="outline"
                    >
                      reject
                    </Button>
                  </ButtonBox>
                )}
              </ChatBox>
            </TouchableOpacity>
          );
        })}
      </ChatsBox>
    </>
  );
};

export default Chats;
