const { ChatInputCommandInteraction } = require("discord.js");
const fs = require('fs');

module.exports = {
    subCommand: "mode.get",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        const m = JSON.parse(fs.readFileSync("serversConfig.json").toString());
        const chosenMode = m[interaction.guildId]["mode"] || "off";
        interaction.reply({content : `Le bot est en mode "${chosenMode}".`, ephemeral: true});
    }
}