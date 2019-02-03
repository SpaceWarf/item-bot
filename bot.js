require('dotenv').config();
const path = require('path');
const commando = require('discord.js-commando');
const db = require('./db/db');

const prefix = '*';

const client = new commando.Client({
    commandPrefix: prefix,
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

client.on('message', message => {
    if (message.content.startsWith(prefix)) {
        db.createPlayer(message.author.username);
    }
});

client.login(process.env.TOKEN);
