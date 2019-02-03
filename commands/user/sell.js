const commando = require('discord.js-commando');
const db = require('../../db/db');
const { find } = require('../../utilities/lists');

module.exports = class Sell extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sell',
            group: 'user',
            memberName: 'sell',
            description: 'Sell an item for some coins.',
            args: [
                {
                    key: 'item',
                    prompt: 'What item do you want to sell?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { item }) {
        const username = message.author.username;
        db.getInventory(username).then(inventory => {
            const itemToSell = find(item, inventory);
            if (itemToSell) {
                message.say(`I\'ll buy this off of you for ${itemToSell.sellPrice}. Pleasure doing business with you.`);
                db.addCoins(username, itemToSell.sellPrice);
                db.removeItem(username, [itemToSell]);
            } else {
                message.say('You don\'t even have this item.');
            }
        });
    }
}