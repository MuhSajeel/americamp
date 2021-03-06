import React, { Fragment } from "react";
import "./App.css";
import { Router } from "react-router-dom";
import RouteViews from "./RouteViews";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import history from "./history";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Header />
          <ToastContainer />
          <RouteViews />
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
