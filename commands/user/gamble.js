const commando = require('discord.js-commando');
const { odds, multipliers } = require('./config/odds.config');

module.exports = class Gamble extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'gamble',
            group: 'user',
            memberName: 'gamble',
            description: 'Gamble your coins to win big or lose it all.',
            args: [
                {
                    key: 'amount',
                    prompt: 'How much are you willing to gamble?',
                    type: 'integer'
                }
            ]
        });
    }

    getRandomMultiplier() {
        const rand = Math.random();
        let odds_sum = 0;
        for (let i = 0; i < odds.length; i++) {
            odds_sum += odds[i];
            if (rand <= odds_sum) {
                return multipliers[i];
            }
        }
    }

    async run(message, { amount }) {
        const multiplier = this.getRandomMultiplier();
        const winnings = Math.ceil(amount * multiplier);

        if (multiplier < 1) {
            message.say(`This ain't your lucky day, better luck next time.`);
        } else if (multiplier < 5) {
            message.say(`Looks like it's your lucky day, you got ${winnings} coins back.`);
        } else {
            message.say(`Jackpot! You got ${winnings} coins back.`)
        }
    }
}