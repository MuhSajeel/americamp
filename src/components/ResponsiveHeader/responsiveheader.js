/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

export class responsiveheader extends Component {
    render() {
        return (

                <div className="col-md-12 onlyforresponsive">
                    <div className="welcomeresp"><span className="welcomeresphead">Welcome Applicant name!</span></div>
                    
                    <nav class="navbar-inverse">
                        <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>                        
                        </button>
                        </div>
                        <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Log Out</a></li>
                        </ul>
                        </div>
                    </nav>
                    <img className="starimg" src="Assets/Stars/AC stars.png" />
                    <img className="profile-img" src="Assets/Icons/profile-image-png-10.png" />
                </div>

        )
    }
}

export default responsiveheader
