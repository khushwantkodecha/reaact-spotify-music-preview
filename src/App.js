import React from "react";
import "./App.css";
import Home from "./components/Home";
import Tracks from "./components/Tracks";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <h1>master first add</h1>
      <h1>branch two changes </h1>
      <Route path="/" component={Home} exact />
      <Route path="/tracks" component={Tracks} />
    </Router>
  );
}

export default App;
