import shortid from "shortid";
import firebase from "data/firebase";

const messageApi = firebase.database.collection("messages");

class Message {
  constructor({ message, userId }) {
    this.author = userId;
    this.status = "pending";
    this.timestamp = new Date();
    this.content = message;
  }
}

const sendMessage = ({ message, chatId, userId }) => {
  const newMessageId = `${new Date().getTime()}_${shortid.generate()}`;
  const newMessage = {
    [newMessageId]: new Message({ message, userId }),
  };
  const parsed = JSON.parse(JSON.stringify(newMessage));
  messageApi.doc(chatId).update(parsed);
};

const create = ({ message, chatId }) => {
  const newMessage = {
    [shortid.generate()]: message,
  };
  const parsed = JSON.parse(JSON.stringify(newMessage));
  messageApi.doc(chatId).set(parsed);
};

export { messageApi, sendMessage, create, Message };
