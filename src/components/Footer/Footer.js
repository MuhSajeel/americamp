/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { SocialIcon } from 'react-social-icons';
import './Footer.css';

export class Footer extends Component {
    render() {
        return (
            <div className="footer">
            <div className="row footer-class">
                <div className="col-md-4 about">
                    <h5>ABOUT US</h5>
                    <img src="Assets/Images/line.jpg" />
                    <p>© AmeriCamp Ltd, Registered in
                        England and Wales No. 07121428.
                        AmeriCamp is a registered
                        trademark. UK00003121039 &
                        EU016524324. All rights reserved.
                    </p>
                    <img className="footer-img" src="Assets/Images/AC_logo.jpg" />
                </div>
                <div className="col-md-4 contact">
                    <h5>CONTACT US</h5>
                    <img src="Assets/Images/line.jpg" />
                    <p>
                        <span>Phone: 0161 312 3640</span><br/>
                        <span>Email: info@AmeriCamp.co.uk</span><br/>
                        <span>Address: Unit 5, Foundry Ordsall
                        Lane Salford M5 3LW</span>
                    </p>
                  
                    <span className="ico"><SocialIcon network="facebook" /></span>
                    <span className="ico"><SocialIcon network="twitter" /></span>
                    <span className="ico"><SocialIcon network="youtube" /></span>
                    <span className="ico"><SocialIcon network="instagram"/></span>
               
                </div>
                <div className="col-md-4 social">
                    <h5>SOCIAL</h5>
                    <img src="Assets/Images/line.jpg" />

                    <div className="row boxes">
                        <div className="white-box"></div>
                        <div className="white-box"></div>
                        <div className="white-box"></div>
                        <div className="white-box"></div>
                        <div className="white-box"></div>
                        <div className="white-box"></div>

                    </div>

                </div>
            </div>
            <div className="foot">
                <p>© AmeriCamp.co.uk 2020</p>
            </div>
            </div>
        )
    }
}

export default Footer
