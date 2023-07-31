const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Gérer les channels dans lesquels le bot n'agira pas.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subCommand) => subCommand
        .setName("set")
        .setDescription("Ajoute un channel à la blacklist.")
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le channel à black lister')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
    )
    .addSubcommand((subCommand) => subCommand
        .setName("remove")
        .setDescription("Retire un channel de la black liste.")
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le channel à retiré de la balck liste.')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
    )
    .addSubcommand((subCommand) => subCommand
        .setName("get")
        .setDescription("Voir les channels black listés."))
}