let chat = document.querySelector("#chat>ul");
let broadcaster_id;
let AppAcessToken = config.MY_API_TOKEN;
let ChatNames = Array();
let Badges = Array();
let ChatProfileLink = Array();
let BetterTTVEmotes = Array();
let FrankerFaceZEmotes = Array();
let SevenTVEmotes = Array();

validateToken();

ComfyJS.Init(config.BOTLOGIN, config.BOTOAUTH, config.TWITCH_LOGIN);

ComfyJS.onChat = (user, message, flags, self, extra) => {
    CreateChatText(message, user, extra.userColor, extra, flags);
}

//Chat message
async function CreateChatText(message, user, colour, extra, flags) {

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

    let badges = document.createElement('div');

    // Adds badges
    if (flags.broadcaster) {
        let badge = new Image();
        badge.src = "img/broadcaster.png";
        badges.append(badge);
    }

    if (flags.mod) {
        let badge = new Image();
        badge.src = "img/mod.png";
        badges.append(badge);
    }

    if (flags.vip) {
        let badge = new Image();
        badge.src = "img/vip.png";
        badges.append(badge);
    }

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

async function validateToken() {
    if (AppAcessToken != undefined &&
        AppAcessToken != "" &&
        AppAcessToken != null) {
        await fetch("https://id.twitch.tv/oauth2/validate", {
            headers: {
                Authorization: "Bearer " + AppAcessToken,
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.status) {
                    if (resp.status == 401) {
                        console.log("This token is invalid ... " + resp.message);
                        return 0;
                    }
                    console.log("Unexpected output with a status");
                    return 0;
                }
                if (resp.client_id) {
                    AclientId = resp.client_id;
                    console.log("Token Validated Sucessfully");
                    return 1;
                }
                console.log("unexpected Output");
                return 0;
            })
            .catch((err) => {
                console.log(err);
                return 0;
            });
        return 1;
    }
    else {
        return 0;
    }
}

async function HttpCalling(HttpCall, Twitch) {
    if (Twitch == true) {
        const respon = await fetch(`${HttpCall}`, {
            headers: {
                Authorization: "Bearer " + AppAcessToken,
                "Client-ID": AclientId,
            },
        })
            .then((respon) => respon.json())
            .then((respon) => {
                return respon;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        return respon;
    }
    else {
        const respon = await fetch(`${HttpCall}`)
            .then((respon) => respon.json())
            .then((respon) => {
                return respon;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
        return respon;
    }
}