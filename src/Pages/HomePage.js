import React, { Component } from 'react';
import HeaderImage from '../components/Header_Image';

class HomePage extends Component {
    render() {
        return (
         <div>
             <HeaderImage />
             <div className="homepage container">
             <div class="row align-items-center">
                  <div class="col-md-7 col-sm-12">
                      <b className="display-3">Are you ready to start your
                           AmeriCamp adventure?</b>
                           <button type="button" class="btn button_cont btnapply">
                               Apply
                               <i class="fa fa-angle-right float-right fa-lg"></i>
                           </button><br />
                           <button type="button" class="btn button_cont btnlogin">
                               Login
                               <i class="fa fa-angle-right float-right fa-lg"></i>
                           </button>
                  </div>
                  <div class="col-md-5">
                  <img className="img-fluid" src="https://dummyimage.com/600x500/000000/fff" alt=""/>
                  </div>
               </div>
            </div>
         </div>
        );
    }
}

export default HomePage;