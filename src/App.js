import React from "react";
import "./App.css";
import Home from "./components/Home";
import Tracks from "./components/Tracks";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact/>
      <Route path="/tracks" component={Tracks} />
    </Router>
  );
}

export default App;
