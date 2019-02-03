const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
    name: String,
    coins: Number,
    inventory: Array
});

module.exports = mongoose.model('Player', playerSchema);