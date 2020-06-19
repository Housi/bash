import React, { useState } from "react";
import styled from "styled-components";

import { useTranslation } from "react-i18next";

// import HeaderImage from "components/user/HeaderImage";
import { Layout, ListItem, Button, Text, Avatar } from "@ui-kitten/components";
import { View } from "react-native";

import ChatRequestForm from "components/event/ChatRequestForm";
import { getAge, formatDistanceToNow } from "utils/datefns";

const UserInfo = styled(Text)`
  margin-block-start: 0;
  margin-block-end: 0.4em;
  font-weight: bold;
`;

const Card = styled(View)`
  border: 2px solid black;
  flex: 1;
  flex-direction: column;
`;

const CardMain = styled(Layout)`
  flex: 1 100%;
  padding: 0 var(--space);
`;

const EventMiniCard = styled(Layout)`
  display: flex;
  background-color: var(--fg-color);
  padding: var(--space);
  border: var(--box-border);
  margin-bottom: 1px;
`;

const Time = styled(Text)`
  background: yellow;
`;

const CardActions = styled(Layout)`
  flex: 1;
`;

const UserPhoto = styled(Avatar)`
  flex: 1;
`;

const Event = ({ event }) => {
  const { date, description, user, userId } = event;
  const userAge = getAge(user.birthday);
  const eventTime = formatDistanceToNow(new Date(date));
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  const CardContent = () => (
    <Card>
      <Avatar source={user.photoUrl} shape="square" size="large" />

      <CardMain>
        <Time>
          {t("event in")} {eventTime}
        </Time>
        <UserInfo>
          {user.name} 🎉 {userAge}
        </UserInfo>
        <Text>{description}</Text>
      </CardMain>

      <CardActions>
        <Button onPress={() => setShowForm(true)}>{t("join")}</Button>
      </CardActions>
    </Card>
  );

  return (
    <EventMiniCard>
      {showForm ? (
        <ChatRequestForm onClose={() => setShowForm(false)} userIdTo={userId} />
      ) : (
        <CardContent />
      )}
    </EventMiniCard>
  );
};

export default Event;
