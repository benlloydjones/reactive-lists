const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const List = require('../models/list');
const User = require('../models/user');

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create([
    {
      username: 'Ben',
      email: 'ben@ben.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    }
  ]))
  .then(users => {
    console.log(`${users.length} users created!`);
    return users;
  })
  .then((users) => List.create([
    {
      name: 'First List',
      items: [
        {
          task: 'pick up milk',
          taskCompleted: false
        },
        {
          task: 'get some eggs',
          taskCompleted: false
        }
      ],
      owner: users[0].id
    }
  ]))
  .then(lists => console.log(`${lists.length} lists created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
