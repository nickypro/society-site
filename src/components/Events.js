import React, {useState, useEffect} from 'react'
import Event from './Event'
import timeFunc from '../functions/timeFunctions'
import Loading from './LoadingBar'

function Events(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
  }, [] );

  const fetchEvents = async () => {
    const data    = await fetch(window.location.origin + "/eventdata");
    const events  = await data.json();
    setEvents(events)
  }

  return(
    <div className="card">
      <h1> Our Events </h1>
      {(events.length===0)?<Loading />:""}
      {/* Scrap here */}
      <div className="events">
      {events
        .filter(event => timeFunc.startOfToday() <= timeFunc.toNum(event.date) )
        .reverse()
        .map(event => <Event event={event} key={event._id} />)}
      </div>
      {events.length !== 0?
      <h2 style={{fontFamily: "'Playfair Display', serif"}}> Past Events </h2>
      :""}  
      <div className="events">
      {events
        .filter(event => timeFunc.startOfToday() > timeFunc.toNum(event.date) )
        .map(event => <Event event={event} key={event._id} />)}
      </div>
          
    </div>
  )
}   

export default Events