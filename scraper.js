const rp = require('request-promise');
const cheerio = require('cheerio');
const Event = require('./eventModel')


/* cut string */
function cut(str, from, to) {
  if (from == -1) 
    return str;
  return str.slice(0, from) + str.slice(from+to)
}

function checkEvent( e ) {
  Event.findById(e._id, (err,data) => {
    if (data) {
      console.log(e._id, " Has been found, updating:")
      Event.updateOne({id: e._id}, e)

    } else {
      console.log(e._id +" not Found, Adding to Database")
      event = new Event(e)
      event.save()
    }
  })
}

function eventScraper(options) {
console.log("----- scraping events -----")
  rp(options)
  .then(data => {
    //console.log(data);
    var $ = cheerio.load(data);
    
    //Class for old events in old format = $('td div.bf')
    //Class for new events in old format = $('td div.bp')
    const eventsOld = $('td div.bp')
    const eventsNew = $('._2x2s')

    //let us know when events are loaded
    console.log(`---------\n events loaded \n---------`)
    if (eventsOld.length > 0) console.log("- Old format page \n---------")
    if (eventsNew.length > 0) console.log("- New format page \n---------")
    
    for(let i = 0; i < eventsOld.length; ++i) {
      //console.log(`\n item ${i} : \n`)
      const event = eventsOld[new String(i)].children[0].children

      //get the time
      let time = event[0].children[0].data;
      time = cut(time, time.indexOf("–"), 10)
      time = cut(time, time.indexOf("at"), 3)

      //get the location
      let location;
      location = event[1].children[0]
      location = (location)? location.children[0].children[0].data : "Unknown Location";
      
      //get the event page info
      let link, title, regex, href, _id; 
        link  = event[2].children[0].children[0]
        title = link.attribs['aria-label'].slice(23)
        regex = /events\/\d+/
        href  = link.attribs.href.match(regex)[0]
        _id   = href.match(/\d+/)[0]

      const e = {
        _id,
        title,
        date: new Date(time),
        location,
        url: `https://www.facebook.com/events/${_id}`
      }

      console.log(i, e)
      checkEvent(e)
    }
    
    //console.log("------\n if new format: \n------")
    for(let i = 0; i < eventsNew.length; ++i) {
      //console.log(`\n item ${i} : \n`)
      const event =  eventsNew[new String(i)].children[0].children
      const title =  event[0].children[0].data;
      const dateArr =event[1].children[0].children;  
      const date = dateArr[1].children[0].data+' '+dateArr[0].children[0].data;
      let time =   event[2].children[0].children[0].children[0].data;
      let   location=event[3].children[0].children[0];
      location = (location) ? location.data : "Unknown Location"
      const regex = /events\/\d+/
      const href = event[event.length-1].attribs.href.match(regex)[0];
      const _id = href.match(/\d+/)[0]
      
      //console.log( date )
      //format time to work if like 8 PM
      if (time.length === 4)
      time = time.slice(0, 1) + ":00" + time.slice(1)
      if (time.length === 5)
      time = time.slice(0, 2) + ":00" + time.slice(2)

      const yr = new Date().getUTCFullYear();

      const e = {
        title,
        date: new Date(yr+" "+date+" "+time),
        location,
        _id,
        url: `https://www.facebook.com/events/${_id}`
      }
      //console.log(e);
      checkEvent(e);
    } 

    console.log("------\n End \n------")
  })
	.catch((err) => console.log(err) );
}

module.exports = eventScraper;