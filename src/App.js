import React, {Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import RouteViews from './RouteViews';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

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
