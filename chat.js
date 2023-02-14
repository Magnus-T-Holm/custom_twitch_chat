var chat = document.querySelector("#chat>ul");

ComfyJS.onChat = (user, message, flags, self, extra) => {
    CreateChatText(message, user, extra.userColor, extra);

    var newMessage = document.createElement("li");
    var text = document.createElement("blockquote");

    newMessage.innerText = user;
    text.innerText = message;

    newMessage.append(text)
    chat.append(newMessage);
}

async function CreateChatText(message, user, color, extra) { }

ComfyJS.onMessageDeleted = (id, extra) => {
    console.log(id, extra);
    chat.innerHTML = "";
};

async function HttpAPICall(HttpCall, Twitch) { }

ComfyJS.Init("AvaterVT");