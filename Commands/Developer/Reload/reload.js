const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload commands and events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
        .setName("events")
        .setDescription("Reload events"))
    .addSubcommand((options) => options
        .setName("commands")
        .setDescription("Reload commands")),
}