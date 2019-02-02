const commando = require('discord.js-commando');
const { items } = require('./config/items.config');

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

    getItemData(item) {
        return items.find(itemData => itemData.name === item);
    }

    async run(message, { item }) {
        const itemData = this.getItemData(item);

        if (itemData) {
            message.say(`You just sold ${itemData.name} for ${itemData.sellPrice}.`);
        } else {
            message.say('You do not have this item.');
        }
    }
}