import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ReactGA from 'react-ga';
import './css/App.css';

import Menu from './components/Menu';
import BigLogo from './components/BigLogo'
import Wordpress from './components/Wordpress'
import Events from './components/Events'
import SignUp from './components/SignUp'

const config = require('./config.json');

//React

function initializeReactGA(page) {
  ReactGA.initialize('UA-150841345-1');
  ReactGA.pageview(page);
}

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
    {initializeReactGA(window.location.pathname)}
    <div className="App welcomeBox">
      <Menu menuItems={this.state.menuItems} 
            width={this.state.width}
            hidden={this.state.menuHidden}
            toggleMenu={this.toggleMenu} />
      
      <div  className="pageFocus" 
            style={this.isMenuShown.bind(this)()? {transform: "translateX(100%)"} : {}}>
        <Switch>
          <Route path="/events" component={Events} />
          <Route path="/signup" component={SignUp} />
          <Route path="/:slug" component={Wordpress} />
          <Route path="/" component={BigLogo} />
        </Switch>    
      </div>

    </div>
    </Router>
  )}
}


export default App;