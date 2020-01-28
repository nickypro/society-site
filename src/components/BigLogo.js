import React from 'react'

const config = require('../config.json');

const BigLogo = () => (
  <div>
    <img className="mainLogo" src="../logoWhite.svg" alt="Vegansoc Logo"/>
    <footer className="bottomText">
      <a href={`${config.wpUrl}wp-login.php`}>Site Admin page</a>
      <p> &copy; {new Date().getUTCFullYear()} {config.longTitle} </p>
      <p> Site designed by <a href="http://pesvut.netsoc.ie">Nicky Pochinkov</a></p>
    </footer>
  </div>
)

export default BigLogo
