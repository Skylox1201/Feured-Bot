const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mode")
        .setDescription("Régler le mode du bot.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((options) => options
            .setName("set")
            .setDescription("Choisir le mode du bot.")
            .addStringOption(subcommande => subcommande
                .setName('mode')
                .setDescription('The mode you want')
                .setRequired(true)
                .addChoices(
                    { name: 'off', value: 'off' },
                    { name: 'feur', value: 'feur' },
                    { name: 'antifeur', value: 'antifeur' },
                )
            )
        )
        .addSubcommand((options) => options
            .setName("get")
            .setDescription("Renvoie le mode dans lequel est actuellement le bot.")
        ),
};