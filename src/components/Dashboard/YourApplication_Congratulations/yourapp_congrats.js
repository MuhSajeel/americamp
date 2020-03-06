/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import React, { Component } from 'react'
import './yourapp_congrats.css';
import Sidepanel from '../../SidePanel/sidepanel';
import { Link } from 'react-router-dom';
import ResponsiveHeader from '../../ResponsiveHeader/responsiveheader'
export class yourapp_congrats extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="row">
            <ResponsiveHeader/>
            <div className="col-md-12">
                <div className="settings">
                <p className="settingsheading">
                <b className="display-3 setting_heading congratspage">Your Application</b>
                </p> 
                </div>
            </div>    

            <Sidepanel/>
            <div className="col-md-1"></div>
            <div className="col-md-7 yourapp">
                <div class="row">                    
                    <b class="welcome congrats">Congratulations! </b>
                    <div className="para">
                        <p>You're a step closer to doing AmeriCamp!<br/>
                        Here's your AC T-shirt.<br/>
                        As you progress through your application you will collect<br/>
                        badges to add to it!<br/>
                        </p>
                    </div>
                    
                    <div className="imagediv">
                    <img className="tshirtimg" src="Assets/Badges/AC tshirt.png" />
                    </div>

                    <div className="buttons">
                    <Link to="/" className="back_contcongrats btnbackcongrats">
                    <span>Back</span>
                    <i className="fa fa-angle-left float-left fa-lg"></i>
                    </Link>
                    <Link to="/" className="next_cont btnnext">
                            <span>Next</span>
                            <i className="fa fa-angle-right float-right fa-lg"></i>
                    </Link>
                    </div>

                </div>         
            </div>
        </div>
        )
    }
}

export default yourapp_congrats
