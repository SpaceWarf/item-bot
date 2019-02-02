const commando = require('discord.js-commando');
const { items } = require('./config/items.config');

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

    getItemData(item) {
        return items.find(itemData => itemData.name === item);
    }

    async run(message, { item }) {
        const itemData = this.getItemData(item);

        if (itemData) {
            message.say(`You just bought ${itemData.name} for ${itemData.buyPrice}.`);
        } else {
            message.say('This item does not exist.');
        }
    }
}