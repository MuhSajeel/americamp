/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft,faCaretRight } from '@fortawesome/free-solid-svg-icons'

export class Header extends Component {
    render() {
        return (
            <div class="header">
            <div class="row">
                <div class="header-class">
                <img class="header-img" src="Assets/Logos/AC logo.png" />
                <div class="social-icons">
                    <span class="ico"><SocialIcon network="facebook" /></span>
                    <span class="ico"><SocialIcon network="twitter" /></span>
                    <span class="ico"><SocialIcon network="instagram" bgColor="rgb(128,0,128)"/></span>
                    <span class="ico"><SocialIcon network="youtube" /></span>
                    <span class="ico"><SocialIcon network="snapchat" /></span>
                </div>
                </div>
                </div>
                <div class="special-announcement">

                    <span id="careticonleft"><FontAwesomeIcon icon={faCaretLeft} /></span>
                    <span class="announce">USED FOR ANY SPECIAL ANNOUNCEMENTS</span>
                    <span id="careticonright"><FontAwesomeIcon icon={faCaretRight} /></span>

                </div>
            </div>
        )
    }
}

export default Header
