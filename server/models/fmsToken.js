const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fmsTokenSchema = new Schema({
    token: String
});

const FmsToken = mongoose.model('FmsToken', fmsTokenSchema);

module.exports = FmsToken;