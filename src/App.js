import React, { Component } from 'react';
import './App.css';
import  Main from "./components/MainComponent";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main/>
        </Router>
      </Provider>
    );
  }
}

export default App;
