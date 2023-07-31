const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, DirectMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, DirectMessages, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember]
});

const { loadEvents } = require ("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

loadEvents(client);

client.login(client.config.token);



