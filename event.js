/* Event Database */
var mongoose = require('mongoose');
const config = require('./src/config.json')

mongoose.connect(config.mongoUri, { useNewUrlParser: true } );

const eventSchema = new mongoose.Schema({
  _id: String,
  title : {type:String, required: true},
  date : Date,
  location : String,
  img : String,
  description: String, 
  url: String
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event