const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const rp = require('request-promise');
const cheerio = require('cheerio');
var mongoose = require('mongoose');
const eventScraper = require('./scraper')
const Event = require('./event')
var dateFormat = require('dateformat');
const toTime = (t) => dateFormat(t, "HH:MM"); /*"h:MM TT"*/
const config = require('./src/config.json')

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

    //eventScraper(req, res, options);
    
    if ( diff >= 2*hour ) {
      console.log(now(), "Scraping timer reset")
      
      eventScraper(options);
      count.seq += 2*hour;
      
      count.save();

      console.log("Scraping request completed")
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

/* Web scraper */

//const url = `https://m.facebook.com/pg/duvegansoc/events/`;
//const proxiedUrl = `http://api.scraperapi.com?api_key=b3847a8ad06fd9aad82d8ba7db3220aa&url=${url}`
//const proxiedUrl = "http://pesvut.netsoc.ie/other/oldpagetoscrape.html"
//const proxiedUrl = "http://pesvut.netsoc.ie/other/newtestpagetoscrape.html"
const proxiedUrl = `${config.scraperUrl}&url=${config.eventsUrl}`  

const options = {
  url: proxiedUrl,
  json: false
}

app.listen(process.env.PORT || 8080);