const SimulatorEvent = require('../../models/simulatorEvent');
const User = require('../../models/user');
const {returnSimEvent} = require('./helper');


module.exports = {
    simEvents: async (req) => {
        if(!req.isAuthenticated) {
            throw new Error('Not authorized!');
        }
        try {
            const simEvents = await SimulatorEvent.find()
            return simEvents.map(simulatorEvent => {
                return returnSimEvent(simulatorEvent);
            });  
        } catch(err) {
            throw err;
        }
    },
    createSimEvent: async (args,req) => {
        if(!req.isAuthenticated) {
            throw new Error('Not authorized!');
        }

        const simulatorEvent = new SimulatorEvent({
            windSpeed: +args.simulatorEventInput.windSpeed,
            electricityConsumption: +args.simulatorEventInput.electricityConsumption,
            price: +args.simulatorEventInput.price,
            date: new Date(args.simulatorEventInput.date),
            creator: req.userId,
        });
        let createdEvent;
        try {
            const result = await simulatorEvent.save()
      
            createdEvent = returnSimEvent(result);
            const creator = await User.findById(req.userId);
      
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