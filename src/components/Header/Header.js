/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { SocialIcon } from 'react-social-icons';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft,faCaretRight } from '@fortawesome/free-solid-svg-icons'

export class Header extends Component {
    render() {
        return (
            <div className="header">
            <div className="row">
                <div className="header-class">
                <img className="header-img" src="Assets/Logos/AC logo.png" />
                <div className="social-icons">
                    <span className="ico"><SocialIcon network="facebook" /></span>
                    <span className="ico"><SocialIcon network="twitter" /></span>
                    <span className="ico"><SocialIcon network="instagram" bgColor="rgb(128,0,128)"/></span>
                    <span className="ico"><SocialIcon network="youtube" /></span>
                    <span className="ico"><SocialIcon network="snapchat" /></span>
                </div>
                </div>
                </div>
                <div className="special-announcement">

                    <span id="careticonleft"><FontAwesomeIcon icon={faCaretLeft} /></span>
                    <span className="announce">USED FOR ANY SPECIAL ANNOUNCEMENTS</span>
                    <span id="careticonright"><FontAwesomeIcon icon={faCaretRight} /></span>

                </div>
            </div>
        )
    }
}

export default Header
