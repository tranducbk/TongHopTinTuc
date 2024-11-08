module.exports = {
    multipleMongooseToObject: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject())
    },
    singleMongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }
}