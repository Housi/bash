import React, { useState } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import { Layout, Button, Avatar } from "@ui-kitten/components";
import { SPACE, BOX_BORDER, COLOR_YELLOW, FG_COLOR } from "theme";

import ChatRequestForm from "components/event/ChatRequestForm";
import { getAge, formatDistanceToNow } from "utils/datefns";

const UserInfo = styled(Text)`
  font-weight: bold;
`;

const CardBox = styled(View)`
  border: 2px solid black;
  display: flex;
  flex-direction: row;
`;

const CardMain = styled(View)`
  padding: 0 ${SPACE};
  width: 60%;
`;

const EventMiniCard = styled(Layout)`
  background-color: ${FG_COLOR};
  padding: ${SPACE};
  border: ${BOX_BORDER};
  margin-bottom: 10px;
  min-width: 40%;
`;

const Time = styled(Text)`
  background: ${COLOR_YELLOW};
`;

const Description = styled(Text)``;

const CardActions = styled(View)``;

const CardSide = styled(View)``;

const Event = ({ event }) => {
  const { date, description, user, userId } = event;
  const userAge = getAge(user.birthday);
  const eventTime = formatDistanceToNow(new Date(date));
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  return (
    <EventMiniCard>
      {showForm ? (
        <ChatRequestForm onClose={() => setShowForm(false)} userIdTo={userId} />
      ) : (
        <CardBox>
          <CardSide>
            <Avatar
              source={{ uri: user.photoUrl }}
              shape="square"
              size="giant"
            />
          </CardSide>

          <CardMain>
            <Time>
              {t("event in")} {eventTime}
            </Time>
            <UserInfo>
              {user.name} 🎉 {userAge}
            </UserInfo>

            <Description>{description}</Description>
          </CardMain>

          <CardActions>
            <Button onPress={() => setShowForm(true)}>{t("join")}</Button>
          </CardActions>
        </CardBox>
      )}
    </EventMiniCard>
  );
};

export default Event;
