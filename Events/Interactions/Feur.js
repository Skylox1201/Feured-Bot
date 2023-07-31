const fs = require('fs');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        // Check if the message was sent by a bot to avoid triggering your own bot messages
        if (message.author.bot) return;

        //Check if the message's channel is blacklisted
        const serverConfig = JSON.parse(fs.readFileSync("serversConfig.json").toString());
        const serverBlackList = serverConfig[message.guild.id]["blacklist"] || [];

        for (i=0; i<serverBlackList.length; i++){
            if(message.channel.id === serverBlackList[i]) return;
        }

        //check the bot state
        const serverMode = serverConfig[message.guild.id]["mode"] || "off";
        if (serverMode === 'off') return;
    
        // Get the content of the message in lowercase to make it case-insensitive
        const content = message.content.toLowerCase();
    
        const quoiRegex = /\bquoi\s*\?*\b/;

        // Define the trigger for "Pourquoi ?" using a regular expression
        const pourquoiRegex = /\bpour(quoi|\s*quoi)\s*\?*\b/;

        // Define the trigger for "Hein ?" using a regular expression
        const heinRegex = /\bhein\s*\?*\b/;

        // Define the trigger for "tg" and its variations using a regular expression
        const tgRegex = /\btg|ta\s*gueule|ferme\s*ta\s*gueule|f\s*t\s*g|t\s*g\b/;

        // Define the trigger for ending with "ah" using a regular expression
        const endsWithAhRegex = /\bah\s*[\?\.\!,;:'"\)\]]*$/;

        // Define the trigger for "y a quoi" using a regular expression
        const yAQuoiRegex = /\b(y\s*a\s*quoi|ya\s*quoi)\b/;

        // Define the trigger for "a quoi" and "à quoi" using a regular expression
        const aQuoiRegex = /\s*(à|a)\s*quoi\b/;

        // Define the trigger for "kwa" using a regular expression
        const kwaRegex = /\bkwa\s*\?*\b/;
    
        if (serverMode === "feur"){
            if (yAQuoiRegex.test(content)) {
                const feurList = [
                    "Y a Feur !",
                    "Y a Feur mec !",
                    "You've been feured !",
                    "Y a Coubeh",
                    "Y a Coubaka",
                    "Y a Coubebebou",
                    "Attention, ça va feurer !",
                    "Y a Feur. Tu cherches aussi...",
                    "Y a Feur - c'est gratuit pour les chauves",
                    "<:feur:1134660584206499921>",
                    "Y a Feur. T'es Finito."
                ];
                // Select a random index from feurList
                const randomIndex = Math.floor(Math.random() * feurList.length);
                // Respond with a random "Feur" message from feurList
                message.reply(feurList[randomIndex]);
            }
        // Check if the message contains "Pourquoi ?"
            else if (pourquoiRegex.test(content)) {
                const pourfeurList = [
                    "Pour Feur !",
                    "Pour Feur mec !",
                    "You've been feured !",
                    "Pour Coubeh",
                    "Pour Coubaka",
                    "Pour Coubebebou",
                    "Attention, ça va feurer !",
                    "Pour Feur. Tu cherches aussi...",
                    "Pour Feur - c'est gratuit pour les chauves",
                    "<:feur:1134660584206499921>",
                    "Pour Feur. T'es Finito."
                ];
                // Select a random index from pourfeurList
                const randomIndex = Math.floor(Math.random() * pourfeurList.length);
                // Respond with a random "Pour Feur" message from pourfeurList
                message.reply(pourfeurList[randomIndex]);
            }
            else if (aQuoiRegex.test(content)) {
                const feurList = [
                    "A Feur !",
                    "A Feur mec !",
                    "You've been feured !",
                    "A Coubeh",
                    "A Coubaka",
                    "A Coubebebou",
                    "Attention, ça va feurer !",
                    "A Feur. Tu cherches aussi...",
                    "A Feur - c'est gratuit pour les chauves",
                    "<:feur:1134660584206499921>",
                    "A Feur. T'es Finito."
                ];
                // Select a random index from feurList
                const randomIndex = Math.floor(Math.random() * feurList.length);
                // Respond with a random "Feur" message from feurList
                message.reply(feurList[randomIndex]);
            }
            else if (quoiRegex.test(content) || kwaRegex.test(content)) {
                const feurList = [
                    "Feur !",
                    "Feur mec !",
                    "You've been feured !",
                    "Coubeh",
                    "Coubaka",
                    "Coubebebou",
                    "Attention, ça va feurer !",
                    "Feur. Tu cherches aussi...",
                    "Feur - c'est gratuit pour les chauves",
                    "<:feur:1134660584206499921>",
                    "Feur. T'es Finito."
                ];
                // Select a random index from feurList
                const randomIndex = Math.floor(Math.random() * feurList.length);
                // Respond with a random "Feur" message from feurList
                message.reply(feurList[randomIndex]);
            }
            // Check if the message contains "Hein ?"
            else if (heinRegex.test(content)) {
                const heinList = [
                    "2",
                    "2, 3, Soleil ! T'as perdu !",
                    "Hein, quoi, comment ?",
                    "2, 3, nous irons dans les bois..."
                ];
                // Select a random index from heinList
                const randomIndex = Math.floor(Math.random() * heinList.length);
                // Respond with a random "2" message from pourfeurList
                message.reply(heinList[randomIndex]);
            }
            else if (tgRegex.test(content)) {
                // Respond with "non" when "tg" or its variations are detected
                message.reply("non");
            }
            else if (endsWithAhRegex.test(content)) {
                // Respond with "b" when the message ends with "ah"
                message.reply("B");
            }
        } else if (serverMode === "antifeur"){
            const antifeurRegex = /\b(?:a |à |de |pour )?feur\b/;;
            const anticoubehRegex = /\b(?:a |à |de |pour )?(cou|coicou|quoicou)(beh|baka|bebou|feur)\b/;
            if (antifeurRegex.test(content)) {
                // Envoyez un message temporaire "Anti Feur" en réponse
                message.reply({content : 'Anti Feur'}).then(msg => {
                    message.delete().catch(console.error);
                    setTimeout(() => msg.delete(), 3000);
                });
            } else if (anticoubehRegex.test(content)) {
                // Envoyez un message temporaire "Anti Coubeh" en réponse
                message.reply({content : 'Anti Coubeh'}).then(msg => {
                    message.delete().catch(console.error);
                    setTimeout(() => msg.delete(), 3000);
                })
            }
        }
    }
};