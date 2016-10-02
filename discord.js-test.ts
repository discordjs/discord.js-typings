/// <reference path="discord.d.ts" />

import { Client } from "discord.js";

const client = new Client({
    disable_everyone: false
});

client.on("message", (message) => {
    if (message.content === "hello") {
        message.channel.sendMessage("o/");
    }
});

client.login("dsfsd754.4fds4f68d4f6sd46f4s.7878easfdsgdfFDSIJIO"); // Yes this is just for testing