const authenticationResolver = require('./auth');
const simEventsResolver = require('./simulatorEvents');
const prosumerResolver = require('./prosumer');

const roootResolver = {
    ...authenticationResolver,
    ...simEventsResolver,
    ...prosumerResolver
};

module.exports = roootResolver;