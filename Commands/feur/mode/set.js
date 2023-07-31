const { ChatInputCommandInteraction } = require("discord.js");
const fs = require('fs');

module.exports = {
    subCommand: "mode.set",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        // Vérifiez si le mode fourni est valide (off, feur ou antifeur)
        const modes = ['off', 'feur', 'antifeur'];
        const chosenMode = interaction.options.getString("mode");
        if (!modes.includes(chosenMode)) {
            interaction.reply({content: 'Mode invalide. Utilisation de la commande : `/mode set [off|feur|antifeur]`', ephemeral : true});
        } else {
            const m = JSON.parse(fs.readFileSync("serversConfig.json").toString());
            m[interaction.guildId]["mode"] = chosenMode;
		    interaction.reply({content : `Le mode du bot a été défini sur "${chosenMode}".`, ephemeral: true});
        }

    }
}