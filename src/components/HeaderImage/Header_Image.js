import React, { Component } from 'react';
import './Header_Image.css';

class Header extends Component {
    render() {
        return (
            <div className="jumbotron big-banner mb-0 jumbotron-fluid" style={{ height: '630px', paddingTop: '150px' }}>
                    <strong className="display-2 text-light">Welcome to AmeriCamp!</strong>
                </div>
        );
    }
}

export default Header;