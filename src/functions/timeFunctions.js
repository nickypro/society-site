const dateFormat = require('dateformat');

export default {
  toWeekday : (t)=> dateFormat(t, "ddd"),
  toMon     : (t) => dateFormat(t, "mmmm"),
  toDay     : (t) => dateFormat(t, "dS"),
  toTime    : (t) => dateFormat(t, "HH:MM"), /*"h:MM TT"*/
  toNum     : (t) => Number(new Date(t)),
  startOfToday : () => new Date().setHours(0,0,0,0)
}
