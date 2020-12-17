const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prosumerSchema = new Schema({
    
    simulatorEvent: {
        type: Schema.Types.ObjectId,
        ref: 'SimulatorEvent'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    production: {
        type: Number,
        required: true
    },
    netProduction: {
        type: Number,
        required: true
    },
    buffer: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Prosumer', prosumerSchema);