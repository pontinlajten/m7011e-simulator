const SimulatorEvent = require('../../models/simulatorEvent');
const {returnSimEvent} = require('./helper');


module.exports = {
    simEvents: async () => {
        try {
            const simEvents = await SimulatorEvent.find()
            return simEvents.map(simulatorEvent => {
                return returnSimEvent(simulatorEvent);
            });  
        } catch(err) {
            throw err;
        }
    },
    createSimEvent: async args => {
        const simulatorEvent = new SimulatorEvent({
            windSpeed: +args.simulatorEventInput.windSpeed,
            electricityConsumption: +args.simulatorEventInput.electricityConsumption,
            price: +args.simulatorEventInput.price,
            date: new Date(args.simulatorEventInput.date),
            creator: '5fda7628d51be46ff3bba287'
        });
        let createdEvent;
        try {
            const result = await simulatorEvent.save()
      
            createdEvent = returnSimEvent(result);
            const creator = await User.findById('5fda7628d51be46ff3bba287');
      
            if(!creator) {
                throw new Error('User does not exist')
            }
            creator.createdEvents.push(simulatorEvent);
            await creator.save();
            return createdEvent;
        } catch(err) {
            throw err;
        }
    }
}