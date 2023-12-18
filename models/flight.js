const mongoose = require('mongoose')

const Schema = mongoose.Schema

const airports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: airports,
    },
    arrival: Date,
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: airports,
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
    destinations: [destinationSchema],
}, {
    timestamps: true
});


module.exports = mongoose.model('Flight', flightSchema)