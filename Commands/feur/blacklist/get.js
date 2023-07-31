const { ChatInputCommandInteraction } = require("discord.js");
const fs = require('fs');

module.exports = {
    subCommand: "blacklist.get",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        const m = JSON.parse(fs.readFileSync("serversConfig.json").toString());
        const blacklist = m[interaction.guildId]["blacklist"] || [];
        if (blacklist.length === 0) {
            interaction.reply({content : `Aucun channel n'a été black listé`, ephemeral: true});
        } else {
            let content = "**Channel(s) bloqué(s) :**\n";
            for (i=0; i<blacklist.length; i++){
                content += `${client.channels.cache.get(blacklist[i])}\n` 
            }
            interaction.reply({content : content, ephemeral: true});
        }
    }
}