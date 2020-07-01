import firebase from "data/firebase";
import { create, Message } from "data/MessageService";
import { getUser } from "data/UserContext";

const chatApi = firebase.database.collection("chats");

class Chat {
  constructor({
    message,
    userIdFrom,
    userIdTo,
    userProfileFrom,
    userProfileTo,
  }) {
    this.users = [userIdFrom, userIdTo];
    this.profiles = [userProfileFrom, userProfileTo];
    this.status = "pending";
    this.timestamp = firebase.timestamp();
    this.lastMessage = new Message({ message, userId: userIdFrom });
  }
}

const chatRequest = async (params) => {
  const userProfileTo = await getUser(params.userIdTo);
  const newChat = JSON.parse(
    JSON.stringify(new Chat({ ...params, userProfileTo }))
  );
  chatApi.add(newChat);
};

const changeStatus = (chatId, status) => chatApi.doc(chatId).update({ status });

const acceptChat = ({ id, message }) => {
  create({ chatId: id, message });
  changeStatus(id, "accepted");
};

const rejectChat = (id) => chatApi.doc(id).delete();

export { chatRequest, rejectChat, acceptChat, Chat, chatApi };
