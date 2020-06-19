import firebase from "data/firebase";

const eventApi = firebase.database.collection("events");

class Event {
  constructor(user, userId) {
    this.userId = userId;
    this.user = user;
    this.description = "";
    this.date = "";
  }
}

const addEvent = (data) => eventApi.add(data);

const updateEvent = (id, data) => eventApi.doc(id).update(data);

const getEventsByUser = async (userId) => {
  const snapshot = await eventApi.where("userId", "==", userId).get();
  let events = [];
  await snapshot.forEach((doc) => {
    const data = doc.data();
    events.push({ id: doc.id, ...data });
  });
  return events;
};

const getEventById = async (id) => {
  const snapshot = await eventApi.doc(id).get();
  const event = await snapshot.data();
  return event;
};

const getEvents = async (userId) => {
  const snapshot = await eventApi.get();
  const events = [];
  const userEvents = [];
  await snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.userId === userId) {
      userEvents.push({ id: doc.id, ...data });
    }
    events.push({ id: doc.id, ...data });
  });
  return [events, userEvents];
};

export {
  addEvent,
  updateEvent,
  getEventsByUser,
  getEventById,
  getEvents,
  Event,
};
