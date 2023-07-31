const { ChatInputCommandInteraction } = require("discord.js");
const fs = require('fs');

module.exports = {
    subCommand: "blacklist.set",
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
            serverBlackList.push(channel.id);
            m[interaction.guildId]["blacklist"] = serverBlackList;
                fs.writeFileSync("serversConfig.json", JSON.stringify(m));
            interaction.reply({content:`#${channel.name} a été ajouté à la black list.`, ephemeral:true});
        } else {
            let channelInBlackList = false;
            for (i = 0 ; i < serverBlackList.length ; i++) {
                if (serverBlackList[i] === channel.id) {
                    channelInBlackList = true;
                    break;
                }
            }
            if (channelInBlackList) {
                interaction.reply({content:`#${channel.name} est déjà dans la black list`, ephemeral:true});
            } else {
                serverBlackList.push(channel.id);
                m[interaction.guildId]["blacklist"] = serverBlackList;
                fs.writeFileSync("serversConfig.json", JSON.stringify(m));
                interaction.reply({content:`#${channel.name} a été ajouté à la black list.`, ephemeral:true});
            }
        }
    }
}