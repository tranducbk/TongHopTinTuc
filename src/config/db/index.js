const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://koaibiet21:21102003@cluster0.lwlh9zr.mongodb.net/');

        console.log('Conect successfully')
    }
    catch (error) {
        console.log('Conect error')
    }
}

module.exports = { connect }