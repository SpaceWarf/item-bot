const commando = require('discord.js-commando');
const db = require('../../db/db');

module.exports = class Buy extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'inventory',
            group: 'user',
            memberName: 'inventory',
            description: 'See what items you currently have.'
        });
    }

    async run(message) {
        db.getInventory(message.author.username).then(inventory => {
            let msg = 'Here is your inventory:';
            if (inventory.length === 0) {
                message.say('Your inventory is empty.');
                return;
            };
            inventory.forEach(item => {
                msg += `\n(${item.quantity}) ${item.name} - ${item.sellPrice}`;
            });
            message.say(msg);
        });
    }
}