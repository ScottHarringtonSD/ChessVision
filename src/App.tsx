import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      <header className=" bg-violet-950  text-emerald-50 sticky top-0 z-10 text-font w-screen ">
        <div className="max-w-5xl mx-auto flex p-4 items-center justify-between">
          <NavLink to="/">
            <h1 className="text-3xl flex text-left">Chess Vision</h1>
          </NavLink>
          <div className="space-x-8">
            <NavLink
              to="/PlayEngine"
              className="hover:opacity-60 text-l text-right "
            >
              Play the Engine
            </NavLink>
          </div>
        </div>
      </header>

      <div className=" text-white text-font overflow-hidden">
        {/* <div className="h-screen w-screen zindex-2 absolute bg-gradient-to-r from-amber-800  to-amber-950 overflow-hidden"></div> */}
        <div className="h-screen w-screen zindex-2 absolute bg-slate-950"></div>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
