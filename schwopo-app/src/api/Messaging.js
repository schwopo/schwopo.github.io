export class Chat {
  constructor() {
    this.messages = [];
    this.partnerId = null;
  }
}

export class Messaging {
  constructor() {
    this.chats = {};
    this.myUserId = null;
    this.activePartnerId = null;

    this.fillWithExampleData();
  }

  fillWithExampleData() {
    const chat = new Chat();
    chat.messages = ["hello", "how are you", "fine thank you"];
    chat.partnerId = "rick";
    this.chats[chat.partnerId] = chat;
    this.activePartnerId = chat.partnerId;
    this.myUserId = "manull";
  }
}