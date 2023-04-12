let chat = document.querySelector("#chat>ul");
import config from "config.json";
let broadcaster_id;
let ChatNames = Array();
let Badges = Array();
let ChatProfileLink = Array();
let BetterTTVEmotes = Array();
let FrankerFaceZEmotes = Array();
let SevenTVEmotes = Array();

ComfyJS.Init(config.TWITCH_LOGIN, config.OAUTH);

ComfyJS.onChat = (user, message, flags, self, extra) => {
    CreateChatText(message, user, extra.userColor, extra);
}

//Chat message
async function CreateChatText(message, user, colour, extra) {

    let profilePicIMG = document.createElement("img");
    if (ChatNames.lastIndexOf(user) == -1) {
        let User = await HttpCalling("https://api.twitch.tv/helix/users?login=" + user, true);
        profilePicIMG.src = User["data"][0]["profile_image_url"];
        ChatNames.push(user);
        ChatProfileLink.push(User["data"][0]["profile_image_url"]);
    }
    else {
        profilePicIMG.src = ChatProfileLink[ChatNames.indexOf(user)];
    }
    let UserprofileLine = document.createElement("div").classList.add("UserProfileLine");

    const newMessage = document.createElement("li");
    const title = document.createElement('div');
    const username = document.createElement("h1");
    const text = document.createElement("blockquote");

    // let badges = document.createElement('div');

    // Adds badges
    // if (flags.broadcaster) {
    //     let badge = new Image();
    //     badge.src = "img/broadcaster.png";
    //     badges.append(badge);
    // }

    // if (flags.mod) {
    //     let badge = new Image();
    //     badge.src = "img/mod.png";
    //     badges.append(badge);
    // }

    // if (flags.vip) {
    //     let badge = new Image();
    //     badge.src = "img/vip.png";
    //     badges.append(badge);
    // }

    username.innerText = user;
    text.innerText = message;

    title.append(UserprofileLine);
    title.append(username);
    newMessage.append(title);
    newMessage.append(text);
    chat.append(newMessage);
}
ComfyJS.onMessageDeleted = (id, extra) => {
    console.log(id, extra);
    chat.innerHTML = "";
};

async function HttpAPICall(HttpCall, Twitch) { }

ComfyJS.Init("AvaterVT");