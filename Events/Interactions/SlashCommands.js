const {ChatInputCommandInteraction} = require("discord.js")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command){
            return interaction.reply({
                content: "This command is outdated.",
                ephemeral: true
            });
        }
        

        if(command.developer && interaction.user.id !== "332865785888374784"){
            return interaction.reply({
                content: "You're not permitted to use this command.",
                ephemeral: true
            });
        }

        const subCommand = interaction.options.getSubcommand(false);
        if (subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if (!subCommandFile){
                return interaction.reply({
                    content: "This command is outdated.",
                    ephemeral: true
                });
            } 
            
            try {
                await subCommandFile.execute(interaction, client);
            } catch (error) {
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
                console.log(error);
            }
            
        } else {
            try {
                await command.execute(interaction, client);
            } catch (error) {
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    awaitinteraction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }
    }
}