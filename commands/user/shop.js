const commando = require('discord.js-commando');
const { items } = require('./config/items.config');

module.exports = class Shop extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'shop',
            group: 'user',
            memberName: 'shop',
            description: 'List all items available for purchase.'
        });
    }

    async run(message) {
        let msg = '**Here\'s what I got for sale**';
        items.forEach(item => {
            msg += `\n  • ${item.name} - ${item.buyPrice} coins`
        });
        message.say(msg);
    }
}