const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/TongHopTinTuc');

        console.log('Conect successfully!')
    }
    catch (error) {
        console.log('Conect error!')
    }
}

module.exports = { connect }