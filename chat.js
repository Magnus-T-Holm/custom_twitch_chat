var chat = document.querySelector("#chat>ul");

ComfyJS.onChat = (user, message, flags, self, extra) => {
    var newMessage = document.createElement("li");
    var text = document.createElement("blockquote");

    newMessage.innerText = user;
    text.innerText = message;

    newMessage.append(text)
    chat.append(newMessage);
}

ComfyJS.onMessageDeleted = (id, extra) => {
    console.log(id, extra);
    chat.innerHTML = "";
};
ComfyJS.Init("AvaterVT");