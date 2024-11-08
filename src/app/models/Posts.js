const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Posts = new Schema({
    name: { type: String, maxlength: 255 },
    author: { type: String , maxlength: 255},
    topic: { type: String, maxlength: 255},
    description: { type: String, maxlength: 1200 },
    image: { type: String, maxlength: 255 },
    link: { type: String, default: ''},
    spotling: { type: Boolean},
    category: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Posts', Posts)