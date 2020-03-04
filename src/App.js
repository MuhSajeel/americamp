import React, {Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import RouteViews from './RouteViews';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return (
    <Provider store={store}>
    <Router>
     <Fragment>
       <Header/>
         <RouteViews/>
       <Footer/>
     </Fragment>
  </Router>
</Provider>
  );
}

export default App;
