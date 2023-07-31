const { ChatInputCommandInteraction } = require("discord.js");
const fs = require('fs');

module.exports = {
    subCommand: "blacklist.remove",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        // Vérifiez si le mode fourni est valide (off, feur ou antifeur)
        const channel = interaction.options.getChannel("channel");
        const m = JSON.parse(fs.readFileSync("serversConfig.json").toString())
        const serverBlackList = m[interaction.guildId]["blacklist"] || []
        if (serverBlackList.length === 0) {
            interaction.reply({content:`#${channel.name} n'est pas black listé.`, ephemeral:true});
        } else {
            let channelInBlackList = false;
            for (i = 0 ; i < serverBlackList.length ; i++) {
                if (serverBlackList[i] === channel.id) {
                    channelInBlackList = true;
                    serverBlackList.splice(i, 1);
                    break;
                }
            }
            if (channelInBlackList) {
                interaction.reply({content:`#${channel.name} retiré de la black list`, ephemeral:true});
            } else {
                serverBlackList.push(channel.id);
                interaction.reply({content:`#${channel.name} n'est pas black listé.`, ephemeral:true});
            }
        }
    }
}