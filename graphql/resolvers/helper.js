const SimulatorEvent = require('../../models/simulatorEvent');
const User = require('../../models/user');



const returnSimEvent = simulatorEvent => {
    return {...simulatorEvent._doc, 
        _id: simulatorEvent.id,
        date: new Date(simulatorEvent._doc.date).toISOString(), 
        creator: user.bind(this, simulatorEvent.creator)};
};

const simEvents = async eventId => {
    try {
        const simEvents = await SimulatorEvent.find({_id: {$in: eventId}})
        simEvents.map(simulatorEvent => {
        return returnSimEvent(simulatorEvent);
    });
    return simEvents;
  } catch(err) {
      throw err;
  }
};

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {...user._doc,
            _id: user.id,
            createdEvents: simEvents.bind(this, user._doc.createdEvents)};
    }
    catch(err) {
        throw err;
    }
};

const singleSimEvent = async eventId => {
    try {
        const event = await SimulatorEvent.findById(eventId);
        return returnSimEvent(event);
    } catch(err) {
        throw err;
    }
}; 

exports.user = user;
exports.singleSimEvent = singleSimEvent;
exports.returnSimEvent = returnSimEvent;
