const Prosumer = require('../../models/prosumer');
const SimulatorEvent = require('../../models/simulatorEvent');
const {singleSimEvent,user,returnSimEvent} = require('./helper');


module.exports = {
    createProsumer: async args => {
        const fetchedEvent = await SimulatorEvent.findOne({_id: args.prosumerInput.eventId});
        const prosumer = new Prosumer({
            simulatorEvent: fetchedEvent,
            user: '5fda7628d51be46ff3bba287',
            production: args.prosumerInput.production,
            netProduction: args.prosumerInput.netProduction,
            buffer: args.prosumerInput.buffer
        });
        const result = await prosumer.save();
        return {...result._doc,
            _id: result.id,
            simulatorEvent: singleSimEvent.bind(this,prosumer._doc.event),
            user: user.bind(this, prosumer._doc.user)
        };
    },
    prosumerSimEvents: async () => {
        try {
            const prosumerSimEvents = await Prosumer.find();
            return prosumerSimEvents.map(simEvent => {
                return {...simEvent._doc,
                    id: simEvent.id,
                    simulatorEvent: singleSimEvent.bind(this,simEvent._doc.simulatorEvent),
                    user: user.bind(this, simEvent._doc.user) 
                };
            });
        } catch(err) {
            throw err;
        }
    },
    deleteProsumerSimEvent: async args => {
        try {
            const deleteSimEvent = await Prosumer.findById(args.prosumerId).populate('simulatorEvent');
            const simulatorEvent = returnSimEvent(deleteSimEvent.simulatorEvent);
            await Prosumer.deleteOne({_id: args.consumerId});
            return simulatorEvent;
        } catch(err) {
            throw err;
        }  
    },

};