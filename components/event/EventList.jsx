import React from "react";
import styled from "styled-components/native";
import Event from "components/event/Event";
import { SPACE } from "theme";
import { ListItem } from "@ui-kitten/components";

const Container = styled(ListItem)`
  padding: ${SPACE};
  flex-direction: column;
  background: transparent;
`;

const EventList = ({ events }) => {
  return (
    <Container>
      {events.map((event) => {
        return <Event event={event} key={event.userId} />;
      })}
    </Container>
  );
};

export default EventList;
