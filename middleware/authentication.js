const jwtToken = require('jsonwebtoken');


module.exports = (req,res,next) => {
    const getAuth = req.get('Authorization');
    if(!getAuth) {
        req.isAuthenticated = false;
        return next();
    }
    const token = getAuth.split(' ')[1];
    if(!token || token == '') {
        req.isAuthenticated = false;
        return next;
    }
    let decodedJwtToken;
    try {
        decodedJwtToken = jwtToken.verify(token, 'key');
    } catch(err) {
        req.isAuthenticated = false;
        return next();
    }
    if(!decodedJwtToken) {
        req.isAuthenticated;
        return next();
    }
    req.isAuthenticated = true;
    req.userId = decodedJwtToken.userId;
    next();

};