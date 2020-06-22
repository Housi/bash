import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, ScrollView } from "react-native";
import { chatApi, acceptChat, rejectChat } from "data/ChatService";
import { otherProfile, UserContext } from "data/UserContext";
import { Button, Text } from "@ui-kitten/components";
import { BOX_BORDER } from "theme";

import SimpleHeader from "components/SimpleHeader";

const ChatBox = styled.View`
  border: ${BOX_BORDER};
  display: flex;
`;

const FriendImage = styled.Image`
  width: 50px;
  height: 50px;
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
    <ScrollView>
      <SimpleHeader navigation={navigation} />

      {chats.map(({ id, lastMessage, status, profiles }) => {
        const friend = otherProfile(profiles);
        return (
          <TouchableOpacity onPress={() => openChat(status, id)} key={id}>
            <ChatBox level="1">
              <FriendImage source={{ uri: friend.photoUrl }} alt="friend" />
              <Text>{lastMessage.content}</Text>
              {status === "pending" && (
                <>
                  <Button
                    onPress={() => acceptChat({ id, message: lastMessage })}
                  >
                    accept
                  </Button>
                  <Button onPress={() => rejectChat(id)} type="secondary">
                    reject
                  </Button>
                </>
              )}
            </ChatBox>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Chats;
