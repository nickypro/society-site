import React from 'react';
import {Link} from 'react-router-dom';

const toKebabCase = str => 
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');

function Menu(props) {
  return(
  <div className="mainMenu" onClick={props.toggleMenu}>
  

  { (props.width <= 900)?
  <div className="topbar">
    <button onClick={props.toggleMenu} className="topbarButton">
      <i className="burger fas fa-bars"></i>
    </button>
    <button onClick={props.toggleMenu} className="topbarButton">
      <h1 id="topbarTitle">VEGANSOC</h1>
    </button>
  </div>:""}

  <Link to="/"> <h1 className="menuHead"> DU Vegan <br/> Society </h1> </Link>

  {props.menuItems.map(menuItem =>
    <Link  
    className="mainButton fadeIn uphover "
    key={toKebabCase(menuItem)} 
    to={"/"+toKebabCase(menuItem)}> 
      {menuItem} 
    </Link>
  )}
	
  <SocialMediaLinks />
  </div>
)}

function SocialMediaLinks() {
  return(
  <div className="mainSocialMedia fadeIn">
      <a href="https://www.facebook.com/duvegansoc"> <span className="zoom fa-stack fa-lg socialMediaIcon">
        <i className="far fa-circle fa-stack-2x"></i>
        <i className="fab fa-facebook-f fa-stack-1x"></i>
      </span></a>
      <a href="https://www.instagram.com/vegansoc"> <span className="zoom fa-stack fa-lg socialMediaIcon">
        <i className="far fa-circle fa-stack-2x"></i>
        <i className="fab fa-instagram fa-stack-1x"></i>
      </span></a>
      <a href="mailto:vegansoc@csc.tcd.com"> <span className="zoom fa-stack fa-lg socialMediaIcon">
        <i className="far fa-circle fa-stack-2x"></i>
        <i className="fas fa-envelope fa-stack-1x"></i>
      </span> </a>
  </div>
  )
}

export default Menu;