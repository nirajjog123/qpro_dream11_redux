import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTeam from "./createTeam/createTeam";
import ViewTeam from "./viewTeam/viewTeam";
import detailTeam from "./detailTeam/detailTeam";
import listTeam from "./listTeam/listTeam";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="topnav">
          <img src="./images/logo.png" className="handleLogo" alt="logo" />
          <Link to="/createteam">Create Team</Link>
          <Link to="/viewteam">View Teams</Link>
        </div>
        <Route  path="/createteam" component={CreateTeam} />
        <Route path="/viewteam" component={ViewTeam} />
        <Route path="/detailteam" component={detailTeam} />
        <Route exact path="/" component={listTeam}/>
      </Router>
    </div>
  );
}

export default connect(
  null,
  null
)(App);
