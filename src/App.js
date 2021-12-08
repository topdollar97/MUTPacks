import NewPackForm from "./components/NewPackForm";
import React from "react";
import { Router, Route } from "react-router-dom";
import Header from "./components/Header";
import history from "./history";
import Home from "./components/Home";
import PackShow from "./components/PullTracker";
import testLocalPack from "./components/testLocalPack";

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Route path='/' exact component={Home}  />
      <Route path='/newPack' exact component={NewPackForm} />
      <Route path='/packs/:id' exact component={PackShow} />
      <Route path='/test' exact component={testLocalPack} />
    </Router>
  );
}

export default App;
