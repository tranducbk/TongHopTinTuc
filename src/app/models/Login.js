const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Login = new Schema({
    email: {type: String, default: ''},
    password: {type: String, default: ''},
    loginAt: {type: Date, default: Date.now},
    LooutAt: {type: String, default: Date.now}
});

module.exports = mongoose.model('Login', Login)