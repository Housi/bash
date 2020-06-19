import React from "react";
import styled from "styled-components";
import Event from "components/event/Event";
import { List, ListItem } from "@ui-kitten/components";

const Container = styled.div`
  padding: var(--space);
`;

const EventList = ({ events }) => {
  return (
    <>
      {events.map((event) => {
        return <Event event={event} key={event.userId} />;
      })}
    </>
  );
};

export default EventList;
