import { useLayoutEffect, useState } from "react";
import PlayerInterface from "../components/PlayerInterface";
import { Puzzle } from "../components/Puzzle";
import { getRandomInt, getTurnFromFEN } from "../components/helper";

interface CheckMatePuzzlesPageProps {
  puzzles: Puzzle[];
}

const CheckmatePuzzlesPage = ({ puzzles }: CheckMatePuzzlesPageProps) => {
  const [puzzleFen, setPuzzleFen] = useState(
    "r3r3/3R1Qp1/pqb1p2k/1p4N1/8/4P3/Pb3PPP/2R3K1 w - - 1 1"
  );

  const randomizePuzzle = () => {
    const randomPuzNum = getRandomInt(0, puzzles.length - 1);
    setPuzzleFen(puzzles[randomPuzNum].FEN);
  };

  useLayoutEffect(() => {
    randomizePuzzle();
  });

  return (
    <div className="text-center">
      <h2 className="text-center text-5xl p-8">Checkmate Puzzles</h2>
      <div className="text-center mx-40 pb-4">
        You will be given the starting position for a checkmate puzzle, then
        must calculate to checkmate whilst only being given the moves in text
        form. The best way to use this resource is to look at the board,
        calculate as far as possible, then hide the board and make the moves
        without checking unless necessary. If you have completed mate in 4, use
        the restart button to try again!
      </div>
      <button
        className="rounded-sm bg-emerald-800 text-center p-3 mx-3 w-78"
        onClick={randomizePuzzle}
      >
        Radomize Puzzle
      </button>
      {getTurnFromFEN(puzzleFen) === "w" ? (
        <div className="text-center mx-40 p-4">White to move</div>
      ) : (
        <div className="text-center mx-40 p-4">Black to move</div>
      )}
      <PlayerInterface difficulty="engine" startFEN={puzzleFen} />
    </div>
  );
};

export default CheckmatePuzzlesPage;
