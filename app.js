
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp  = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const crypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html'); 




app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      firstName: String!
      lastName: String!
      birthDate: String!
      address: String!
    }

    input UserInput {
      email: String!
      password: String!
      firstName: String
      lastName: String
      birthDate: String
      address: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then(events => {
          return events.map(event => {
            return {...event._doc, _id: event.id};
          });
        })
        .catch(err => {
          throw err;
        });
    },
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      let createdEvent;
      return event
      .save()
      .then(result => {
        createdEvent = {...result._doc, _id: result._doc._id.toString()};
        return User.findById('5fd6a0709776453abee3df22')
      })
      .then(user => {
        if(!user) {
          throw new Error('User does not exist')
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
    },
    createUser: args => {
      return User.findOne({email: args.userInput.email})
      .then(user => {
        if(user) {
          throw new Error('Email address is already used by another user')
        }
        return crypt
      .hash(args.userInput.password, 14)
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword,
          firstName: args.userInput.firstName,
          lastName: args.userInput.lastName,
          birthDate: args.userInput.birthDate,
          address: args.userInput.address,
          creator: '5fd6a0709776453abee3df22'
        });
        return user.save();
      })
      .then(result => {
        return {...result._doc, password: null, _id: result.id};
      })
      .catch(err => {
        throw err;
      });
    } 
  },
  graphiql: true
}));
  
  
 /* exports.index = function(req, res){
    res.render('index');
  }; 

  app.get("/index", function (req, res) { 
    res.render("index", { title: 'Homepage'}); 
});  */



const dbPath = 'mongodb://localhost/m7011e';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
    app.listen(3000);
}, error => {
    console.log(error, 'error');
}) 



