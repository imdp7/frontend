import React from "react";
import {Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Send from "./components/Send";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import User from "./components/User";
import Request from "./components/Request";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark mx-2 px-3">
        <a href="/" className="navbar-brand">
          Wallet
        </a>
        <div className="navbar-nav mr-auto float-right">
          <li className="nav-item">
            <Link to={"/transactions"} className="nav-link">
            Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/sends"} className="nav-link">
              Send
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/requests"} className="nav-link">
              Request
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
      
        <Routes>
        <Route  path="/" element={<User/>} />
          <Route  path="/transactions" element={<TutorialsList/>} />
          <Route  path="/sends" element={<Send/>} />
          <Route  path="/requests" element={<Request/>} />
          <Route path="/transactions/:ssn" element={<Tutorial/>} />
        </Routes>
  
      </div>
    </div>
  );
}
export default App;
