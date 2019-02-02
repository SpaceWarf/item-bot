const commando = require('discord.js-commando');
const { items } = require('./config/items.config');

module.exports = class List extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'user',
            memberName: 'list',
            description: 'List all items available for purchase.'
        });
    }

    async run(message) {
        let msg = "";
        items.forEach(item => {
            msg += `${item.name} - ${item.buyPrice} coins\n`
        });
        message.say(msg);
    }
}