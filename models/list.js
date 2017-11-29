const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  task: { type: String, required: 'You need a list item'},
  taskCompleted: { type: Boolean }
});

const listSchema = new mongoose.Schema({
  items: [ itemSchema ],
  name: { type: String, required: 'Your list needs a name' },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'true' }
});

module.exports = mongoose.model('List', listSchema);
