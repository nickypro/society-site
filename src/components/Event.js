import React from 'react'
import timeFunc from '../functions/timeFunctions'

const Event = (props) => (
  <a  className="event"
      href={props.event.url} 
      data-date={props.event.date} 
      data-title={props.event.title}
      data-location={props.event.location}>
    <div className="eventDate">
      <span className="dateWeekday">
        {timeFunc.toWeekday(props.event.date)}
        <span className="dateDay">    {timeFunc.toDay(props.event.date)}</span>
      </span>
      <span className="dateMonth">  {timeFunc.toMon(props.event.date)}</span>
    </div>
    <div className="eventData">
      <h2>  {props.event.title}</h2>
      <p>   {props.event.location}</p>
      <p>{timeFunc.toTime(props.event.date)}</p>
    </div>
  </a>
)

export default Event