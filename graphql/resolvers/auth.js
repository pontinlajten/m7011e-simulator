const crypt = require('bcryptjs');
const User = require('../../models/user');


module.exports = {
    createUser: async args => {
        try {
            const dbUser = await User.findOne({email: args.userInput.email})
            if(dbUser) {
             throw new Error('Email address is already used by another user')
        }
            const hashedPassword = await crypt.hash(args.userInput.password, 14)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                birthDate: args.userInput.birthDate,
                address: args.userInput.address
            });
            const result = await user.save();
      
            return {...result._doc, password: null, _id: result.id};
      
        }  catch(err) {
            throw err;
        } 
    }
};

