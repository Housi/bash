import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "data/UserContext";
import { getEvents, Event } from "data/EventService";
import EventList from "components/event/EventList";
import EventEdit from "components/event/EventEdit";
import styled from "styled-components";
// import Logo from "components/ui/Logo";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  Layout,
} from "@ui-kitten/components";
import { ScrollView, TouchableOpacity } from "react-native";

const Navi = styled(TopNavigation)`
  padding: 20px;
`;

const Home = ({ navigation }) => {
  const { uid, user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [userEvent, setUserEvent] = useState(new Event(user, uid));

  useEffect(() => {
    async function getData() {
      const [eventsData, userEventsData] = await getEvents(uid);
      setEvents(eventsData);
      if (userEventsData.length) {
        setUserEvent(userEventsData[0]);
      }
    }
    getData();
  }, [uid]);

  const SettingsLink = () => (
    <TouchableOpacity onPress={() => navigation.navigate("settings")}>
      <Avatar
        source={{ uri: user.photoUrl || DEFAULT_AVATAR_URL }}
        alt="user"
      />
    </TouchableOpacity>
  );

  const ChatsLink = (props) => {
    const ChatsIcon = (props) => <Icon name="email-outline" {...props} />;
    return (
      <TopNavigationAction
        icon={ChatsIcon}
        onPress={() => navigation.navigate("chats")}
      />
    );
  };

  return (
    <>
      <Navi
        alignment="center"
        title={<Text category="h2">Bash</Text>}
        accessoryLeft={SettingsLink}
        accessoryRight={ChatsLink}
      ></Navi>
      <ScrollView>
        <EventList events={events} />
        {/* <Drawer>
        <EventEdit event={userEvent} />
      </Drawer> */}
      </ScrollView>
    </>
  );
};

export default Home;
