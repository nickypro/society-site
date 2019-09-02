import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/App.css';
import Menu from './Menu';
const config = require('./config.json');

var dateFormat = require('dateformat');

const toWeekday=(t)=> dateFormat(t, "ddd")
const toMon =  (t) => dateFormat(t, "mmmm");
const toDay =  (t) => dateFormat(t, "dS");
//const toDate = (t) => dateFormat(t, "ddd dS mmm yyyy");
const toTime = (t) => dateFormat(t, "HH:MM"); /*"h:MM TT"*/

const postsUrl = `${config.wpUrl}wp-json/wp/v2/posts`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuHidden: true,
      menuItems: config.menuItems,
      width: window.innerWidth
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      menuHidden: !this.state.menuHidden
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  isMenuShown = () => {
    return( this.state.width <= 900 & !this.state.menuHidden )
  }

  render() {
  return (
    <Router>
    <div className="App welcomeBox"
    style={ this.isMenuShown.bind(this)()?{ /*gridTemplateRows: "1fr 0px"*/ }:{}}>
      <Menu menuItems={this.state.menuItems} 
            width={this.state.width}
            hidden={this.state.menuHidden}
            toggleMenu={this.toggleMenu} />
      
      <div  className="pageFocus" 
            style={this.isMenuShown.bind(this)()? {transform: "translateX(100%)"} : {}}>
        <Switch>
          <Route path="/events" component={Events} />
          <Route path="/:slug" component={Wordpress} />
          <Route path="/" component={BigLogo} />
        </Switch>    
      </div>

    </div>
    </Router>
  )}
}

function BigLogo() {
  return(
  <div>
    <img className="mainLogo" src="../logoWhite.svg" alt="Vegansoc Logo"/>
    <footer className="bottomText">
      <a href={`${config.wpUrl}wp-login.php`}>Site Admin page</a>
      <p> &copy; {new Date().getUTCFullYear()} {config.longTitle} </p>
      <p> Site designed by <a href="http://pesvut.netsoc.ie">Nicky Pochinkov</a></p>
    </footer>
  </div>
  )
}

function Events(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
  }, [] );

  const fetchEvents = async () => {
    const data = await fetch(
    window.location.origin + "/eventdata"
  );

  const events = await data.json();
    setEvents(events)
  }

  return(
    <div className="card">
      <h1> Our Events </h1>

      {/* Scrap here */}
      <div className="events">
      {events.map(event => 
        <a className="event" 
          key={event._id} 
          href={event.url} 
          data-date={event.date} 
          data-title={event.title}
          data-location={event.location}>
          <div className="eventDate">
            <span className="dateWeekday">{toWeekday(event.date)}
              <span className="dateDay">    {toDay(event.date)}</span>
            </span>
            <span className="dateMonth">  {toMon(event.date)}</span>
          </div>
          <div className="eventData">
            <h2>  {(event.title.length > 30) ? event.title.slice(0, 29)+"...": event.title}</h2>
            <p>   {event.location}</p>
            <p>{toTime(event.date)}</p>
          </div>
        </a>
      )}
      </div>
          
    </div>
  )
}  

function Wordpress(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchEvents()
  }, [] );

  const fetchEvents = async () => {
    const data = await fetch(postsUrl);
    const posts = await data.json();
    setPosts(posts)
  }
  
  return(
  <div className="card">
    <h1> {props.match.params.slug} </h1>
    <div className="content"
    dangerouslySetInnerHTML=
    {{__html: posts
      .filter(x => {
        return x.slug === props.match.params.slug
      })
      .map(x => x.content.rendered)
    }}></div>
  </div>
  )
}

export default App;