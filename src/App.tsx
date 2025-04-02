import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayEnginePage from "./pages/PlayEnginePage";
import CheckmatePuzzlesPage from "./pages/CheckmatePuzzlesPage";
import { PuzzleFiles } from "./components/PuzzleFiles";

function App() {
  return (
    <Router>
      <div className="h-auto w-auto bg-slate-950">
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <header className=" bg-violet-950  text-emerald-50 sticky top-0 z-10 text-font w-full ">
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
              <NavLink
                to="/CheckmatePuzzles"
                className="hover:opacity-60 text-l text-right "
              >
                Checkmate Puzzles
              </NavLink>
            </div>
          </div>
        </header>

        <div className=" text-white text-font overflow-hidden">
          {/* <div className="h-screen w-screen zindex-2 absolute bg-gradient-to-r from-amber-800  to-amber-950 overflow-hidden"></div> */}
          <div className="absolute h-full w-full zindex-2  bg-slate-950"></div>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/PlayEngine" element={<PlayEnginePage />} />
              <Route
                path="/CheckmatePuzzles"
                element={<CheckmatePuzzlesPage puzzles={PuzzleFiles} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
