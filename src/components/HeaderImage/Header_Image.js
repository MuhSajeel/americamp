import React, { Component } from 'react';
import './Header_Image.css';

class Header extends Component {
    render() {
        return (
            <div className="jumbotron big-banner mb-0 jumbotron-fluid">
                   <p className="welcomepageheading"><strong className="display-2 text-light">Welcome to AmeriCamp!</strong></p>
            </div>

        );
    }
}

export default Header;