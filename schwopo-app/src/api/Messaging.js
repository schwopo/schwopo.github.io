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
    this.friends = [];

    this.fillWithExampleData();
  }

  fillWithExampleData() {
    const chat = new Chat();
    chat.messages = [
      { author: "rick", message: "Wubba Lubba Dub Dub!" },
      { author: "manull", message: "Lubba Dub Dub!" },
      { author: "rick", message: " Dub!" },
    ];
    chat.partnerId = "rick";
    this.chats[chat.partnerId] = chat;
    this.activePartnerId = chat.partnerId;
    this.myUserId = "manull";
    this.friends = ["rick", "morty", "summer", "beth", "jerry"];
  }
}