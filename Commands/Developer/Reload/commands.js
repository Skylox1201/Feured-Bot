const { ChatInputCommandInteraction, Client } = require("discord.js")
const { loadCommands } = require("../../../Handlers/commandHandlers")

module.exports = {
    subCommand: "reload.commands",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        loadCommands(client);
        interaction.reply({content: "Commands reloaded", ephemeral: true});
    }
}