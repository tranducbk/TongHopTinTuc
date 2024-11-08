const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    userName: {type: String, default: ''},
    email: {type: String, default: ''},
    password: {type: String, default: ''},
    permission: {type: String, default: 'User'}
}, {
    timestamps: true
})

module.exports = mongoose.model('user', User)