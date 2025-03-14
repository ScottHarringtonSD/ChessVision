import React, { useEffect, useState } from "react";
import "./App.css";

function HomePage() {
  return (
    <div className=" w-full absolute ">
      <div className=" max-w-4xl mx-auto flex justify-center p-6 pt-10 items-center mt-10">
        <div className="text-center">
          <h1 className="text-8xl text-amber-50">Chess Vision</h1>
          <p className="text-3xl text-amber-50 p-2">
            The blindfold chess training meccah
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
