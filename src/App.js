import React, {Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import RouteViews from './components/RouteViews';
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
     <Fragment>
       <Header/>
         <RouteViews/>
       <Footer/>
     </Fragment>
  </Router>
  );
}

export default App;
