const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const simulatorSchema = new Schema({
    windSpeed: {
        type: Number,
        required: true
    },
    electricityConsumption: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
   
});

module.exports = mongoose.model('SimulatorSchema', simulatorSchema);
