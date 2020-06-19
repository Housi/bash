import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
// import { navigate } from "hookrouter";
import { chatApi, acceptChat, rejectChat } from "data/ChatService";
import { otherProfile, UserContext } from "data/UserContext";
import { Button } from "@ui-kitten/components";
import SimpleHeader from "components/SimpleHeader";

const ChatBox = styled.div`
  border: var(--box-border);
  background: var(--fg-color);
  display: flex;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    chatApi
      .where("users", "array-contains", uid)
      .onSnapshot((querySnapshot) => {
        const chats = [];
        querySnapshot.forEach(function(doc) {
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

      {chats.map(({ id, lastMessage, status, profiles }) => {
        const friend = otherProfile(profiles);
        return (
          <ChatBox onClick={() => openChat(status, id)} key={id}>
            <Image src={friend.photoUrl} alt="friend" />
            <p>{lastMessage.content}</p>
            {status === "pending" && (
              <>
                <Button
                  onClick={() => acceptChat({ id, message: lastMessage })}
                >
                  accept
                </Button>
                <Button onClick={() => rejectChat(id)} type="secondary">
                  reject
                </Button>
              </>
            )}
          </ChatBox>
        );
      })}
    </>
  );
};

export default Chats;
