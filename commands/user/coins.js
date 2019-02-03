const commando = require('discord.js-commando');
const db = require('../../db/db');

module.exports = class Buy extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'coins',
            group: 'user',
            memberName: 'coins',
            description: 'See how many coins you currently have.'
        });
    }

    async run(message) {
        db.getCoins(message.author.username).then(coins => {
            message.say(`You currently have ${coins} coins`);
        });
    }
}