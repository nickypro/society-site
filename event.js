/* Event Database */
var mongoose = require('mongoose');

URI = "mongodb+srv://admin:admin@freecodecamp-1dbrw.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(URI, { useNewUrlParser: true } );

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