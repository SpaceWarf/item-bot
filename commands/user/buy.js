const commando = require('discord.js-commando');
const db = require('../../db/db');
const { items } = require('./config/items.config');
const { find } = require('../../utilities/lists');

module.exports = class Buy extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'buy',
            group: 'user',
            memberName: 'buy',
            description: 'Buy an item with your coins.',
            args: [
                {
                    key: 'item',
                    prompt: 'What item do you want to buy?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { item }) {
        const username = message.author.username;
        db.getCoins(username).then(coins => {
            const itemData = find(item, items);
            if (itemData) {
                if (itemData.buyPrice > coins) {
                    message.say(`This item costs ${itemData.buyPrice} and you only have ${coins}. What the hell are you trying to do?`);
                } else {
                    message.say('Pleasure doing business with you. Come back soon.');
                    db.removeCoins(username, itemData.buyPrice);
                    db.addItems(username, [itemData]);
                }
            } else {
                message.say('I don\'t sell this item yet.')
            }
        });
    }
}