require('dotenv').config();
const path = require('path');
const commando = require('discord.js-commando');
const client = new commando.Client({
    commandPrefix: '*',
    owner: ['132972681703194625']
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['user', 'User']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
});

client.login(process.env.TOKEN);
