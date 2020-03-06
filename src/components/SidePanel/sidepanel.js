/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './sidepanel.css';
import { Link } from 'react-router-dom';
export class sidepanel extends Component {
    render() {
        return (
                <div class="col-md-2 sidepanel">
                    <p className="welcome">Welcome!<img className="bellimg" src="Assets/Icons/Notification icon.png" /></p>
                    <p className="applicant_name">Applicant Name</p>
                    <p><img className="profile-img" src="Assets/Icons/profile-image-png-10.png" /></p>

                    <div className="sidebar">
                    <Link to="/yourapplication"><a href="#">Home</a></Link>
                        <Link to="/settingsmain"><a href="#">Settings</a></Link>
                        <Link to="/login"><a href="#">Log Out</a></Link>
                    </div>
                </div>

        )
    }
}

export default sidepanel
