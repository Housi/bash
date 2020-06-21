import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "data/UserContext";
import { getEvents, Event } from "data/EventService";
import EventList from "components/event/EventList";
import EventEdit from "components/event/EventEdit";
// import Logo from "components/ui/Logo";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  Layout,
} from "@ui-kitten/components";
import { ScrollView } from "react-native";

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
    <Avatar
      onClick={() => navigation.navigate("settings")}
      source={user.photoUrl || DEFAULT_AVATAR_URL}
      alt="user"
    />
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

  const NavIcons = () => (
    <>
      <SettingsLink />
      <ChatsLink />
    </>
  );

  return (
    <>
      <TopNavigation accessoryRight={NavIcons} title="Bash" />
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
