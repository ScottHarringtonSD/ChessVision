import { useEffect, useLayoutEffect, useState } from "react";
import PlayerInterface from "./PlayEngineComponents/PlayerInterface";

const PlayEnginePage = () => {
  const [difficulty, setDifficulty] = useState<string>();

  return (
    <div className="">
      <h2 className="text-center text-5xl p-8"> Play The Engine</h2>
      <div className="text-center mx-40 pb-4">
        Move input is doing using standard SAN notation e.g. "c4", "Nf6",
        "Bxg7", "Qd8+", "Rxf7#", "b8=Q+". You must signify checks, captures,
        promotions and checkmates in order for your move to be considered valid.
        Good luck!
      </div>
      {!difficulty && (
        <div>
          <div className="text-3xl text-center"> Choose difficulty:</div>
          <div className="p-4 text-center ">
            <span className="p-2">
              <button
                className="rounded-sm bg-emerald-800 text-center p-3 mx-3 w-28"
                onClick={() => {
                  setDifficulty("easy");
                }}
              >
                Intermediate
              </button>
            </span>
            <span className="p-2">
              <button
                className="rounded-sm bg-emerald-800 text-center p-3 mx-3 w-28"
                onClick={() => {
                  setDifficulty("medium");
                }}
              >
                Advanced
              </button>
            </span>
            <span className="p-2">
              <button
                className="rounded-sm bg-emerald-800 text-center p-3 mx-3 w-28"
                onClick={() => {
                  setDifficulty("hard");
                }}
              >
                Master
              </button>
            </span>
          </div>
        </div>
      )}
      {difficulty && <PlayerInterface difficulty={difficulty} />}
    </div>
  );
};

export default PlayEnginePage;
