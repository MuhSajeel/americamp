import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CreateAccount from './components/Dashboard/CreateAccount/CreateAccount'

function App() {
  return (
    <div className="App">
     <Header/>
     <CreateAccount/>
     <Footer/>
    </div>
  );
}

export default App;
