import React from "react";
import styled from "styled-components/native";
import Event from "components/event/Event";
import { SPACE } from "theme";

const Container = styled.View`
  padding: ${SPACE};
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
