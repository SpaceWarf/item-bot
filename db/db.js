const mongoose = require('mongoose');
const PlayerModel = require('./models/player')
const { find, remove } = require('../utilities/lists');

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(
            `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`
        )
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }

    getPlayer(name) {
        return PlayerModel.findOne({ name });
    }

    getCoins(name) {
        return this.getPlayer(name).then(player => {
            return player ? player.coins : 0;
        });
    }

    addCoins(name, coinsToAdd) {
        this.getCoins(name).then(coins => {
            this.updateCoins(name, coins + coinsToAdd)
        });
    }

    removeCoins(name, coinsToRemove) {
        this.getCoins(name).then(coins => {
            this.updateCoins(name, coins - coinsToRemove)
        });
    }

    updateCoins(name, coins) {
        PlayerModel.updateOne({ name }, {
            coins
        }).exec();
    }

    getInventory(name) {
        return this.getPlayer(name).then(player => {
            return player ? player.inventory : [];
        });
    }

    addItems(name, itemsToAdd) {
        this.getInventory(name).then(inventory => {
            itemsToAdd.forEach(itemToAdd => {
                const itemInInventory = find(itemToAdd.name, inventory);
                if (itemInInventory) {
                    itemInInventory.quantity += 1;
                } else {
                    itemToAdd.quantity = 1;
                    inventory.push(itemToAdd);
                }
            });
            this.updateInventory(name, [
                ...inventory
            ]);
        });
    }

    removeItem(name, itemsToRemove) {
        this.getInventory(name).then(inventory => {
            let filteredInventory = inventory;
            itemsToRemove.forEach(itemToRemove => {
                const inventoryItem = find(itemToRemove.name, filteredInventory);
                if (inventoryItem.quantity === 1) {
                    filteredInventory = remove(itemToRemove.name, filteredInventory);
                } else {
                    inventoryItem.quantity -= 1;
                }
            });
            this.updateInventory(name, filteredInventory);
        });
    }

    updateInventory(name, inventory) {
        PlayerModel.updateOne({ name }, {
            inventory
        }).exec();
    }

    createPlayer(username) {
        this.getPlayer(username).then(player => {
            if (player) { return; }
            const newPlayer = new PlayerModel({
                name: username,
                coins: 500,
                inventory: []
            });
            newPlayer.save()
                .then(() => {
                    console.log('Document successfully saved')
                })
                .catch(err => {
                    console.error(err)
                })
        });
    }
}

module.exports = new Database()

