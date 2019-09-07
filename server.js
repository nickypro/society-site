const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var mongoose = require('mongoose');
const eventScraper = require('./scraper')
const Event = require('./event')
var dateFormat = require('dateformat');
const toTime = (t) => dateFormat(t, "HH:MM"); /*"h:MM TT"*/
const config = require('./src/config.json')
const request = require('request')
//const authToken = require('./cherrypie.js');

mongoose.connect(config.mongoUri, { useNewUrlParser: true } );

var CounterSchema = new mongoose.Schema({
  _id: {type: String, required: true}, 
  seq: { type: Number, default: 0 }    
});
var counter = mongoose.model('counter', CounterSchema);

const now = () => new Date().getHours() + ":" + new Date().getMinutes();	 

/* use Express */
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

/* Web scraper Options*/
const options = {
  url: `${config.scraperUrl}&url=${config.eventsUrl}`,
  json: false
}

/* get event data api */
app.get('/eventdata', (req, res) => {
  
  console.log(now(), "Trying to scrape")
  
  counter.findById('previousScrape').then(count => {

    if (!count) new counter({_id: 'previousScrape', seq: Number(new Date)} ).save()

    const hour = 3600000;
    const diff = Number( new Date() ) - count.seq;

    if ( diff >= 2*hour ) {
      console.log(now(), "Scraping timer reset")
      
      eventScraper(options);
      count.seq += 2*hour;
      count.save();

    } else {
      
      const nextTime = toTime( new Date(2*hour - diff) ); 
      console.log(`${now()} Time until next scraping request: ${nextTime} `)
    
    }

  }).catch( err => console.log(err))

  Event.find({}) 
  .then( data => {
    console.log("data fetched, being sorted")
    res.json( data.sort( (a, b) => b.date - a.date ) )
    console.log("data delivered") 
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/:page', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 8080);