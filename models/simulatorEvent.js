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
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
   
  },
  {timestamps: true}
);

module.exports = mongoose.model('SimulatorEvent', simulatorSchema);
