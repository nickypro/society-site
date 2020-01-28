import React from 'react';

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

export default SocialMediaLinks;