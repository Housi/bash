import firebase from "data/firebase";
const messageApi = firebase.database.collection("messages");
const chatApi = firebase.database.collection("chats");

class Message {
  constructor({ message, userId }) {
    this.author = userId;
    this.status = "pending";
    this.timestamp = firebase.timestamp();
    this.content = message;
  }
}

const sendMessage = ({ message, chatId, userId }) => {
  const newMessage = new Message({ message, userId });
  const parsed = JSON.parse(JSON.stringify(newMessage));
  chatApi
    .doc(chatId)
    .collection("messages")
    .add(parsed);
};

const create = ({ message, chatId }) => {
  // const parsed = JSON.parse(JSON.stringify(newMessage));
  chatApi
    .doc(chatId)
    .collection("messages")
    .add(message);
};

export { messageApi, chatApi, sendMessage, create, Message };
