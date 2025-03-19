import { useEffect, useLayoutEffect, useState } from "react";
import { postChessApi } from "../../api/queries";
import { StockfishResponse } from "../../api/StockfishResponse";
import { text } from "stream/consumers";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export type PlayerInterfaceProps = {
  difficulty: string;
};

const PlayerInterface = ({ difficulty }: PlayerInterfaceProps) => {
  const [engineResponse, setEngineResponse] = useState<StockfishResponse>();
  const [loading, setLoading] = useState(false);
  const [gameFen, setGameFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [runEngine, setRunEngine] = useState(false);
  const [error, setError] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const [moveOptionList, setMoveOptionList] = useState<string[]>();

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(array: string[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function getArraySectionEasy(arr: string[]) {
    const halfLength = Math.ceil(arr.length / 1.7);
    return arr.filter((_, index) => index <= halfLength);
  }

  const getDepth = () => {
    if (difficulty === "easy") {
      return getRandomInt(2, 2);
    } else if (difficulty === "medium") {
      return getRandomInt(2, 4);
    } else {
      return getRandomInt(3, 7);
    }
  };

  const loadEngineResponse = async () => {
    setLoading(true);
    try {
      const data = await postChessApi({
        fen: gameFen,
        depth: getDepth(),
        maxThinkingTime: 50,
      });
      setEngineResponse(data);
    } catch {
      console.log("damned");
    } finally {
      setLoading(false);
      setRunEngine(false);
    }
  };

  const submitMove = () => {
    const moveInput = document.getElementById("moveSubmission");
    setError("");
    if (moveInput) {
      const playerMove = (moveInput as HTMLInputElement).value;
      const chessboard = new Chess(gameFen);
      if (playerMove && chessboard.moves().includes(playerMove)) {
        playerMove && chessboard.move(playerMove, { strict: false });
        const fullMoveOptionList: string[] = shuffle(chessboard.moves());
        setGameFen(chessboard.fen().toString());
        const randomMoveChance = getRandomInt(1, 5);
        if (randomMoveChance === 5) {
          console.log("random");
          chessboard.move(fullMoveOptionList[0], { strict: false });
          setGameFen(chessboard.fen().toString());
        } else {
          setRunEngine(true);
        }
      } else {
        setError("Invalid Move. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (runEngine) {
      loadEngineResponse();
    }
  }, [runEngine]);

  useEffect(() => {
    const chessboard = new Chess(gameFen);
    if (engineResponse) {
      chessboard.move(engineResponse.san, { strict: false });
      setGameFen(chessboard.fen().toString());
    }
  }, [engineResponse]);

  return (
    <>
      <div className="text-center p-2 text-2xl">
        Engine Response: {loading && <span>Response Loading...</span>}{" "}
        {engineResponse && !loading && engineResponse.san}
      </div>
      <div className="content-center justify-center p-2 text-center">
        <input
          id="moveSubmission"
          type="text"
          className="bg-violet-950 p-3 rounded-sm"
          placeholder="Player move..."
        ></input>
        <button
          className="rounded-sm bg-emerald-800 text-center p-3 mx-3"
          onClick={submitMove}
        >
          Submit move
        </button>
      </div>
      <div className="p-2 text-center text-amber-400">{error}</div>
      <div className="content-center justify-center p-2 text-center">
        <button
          className="rounded-sm bg-emerald-800 text-center p-3 mx-3"
          onClick={() => {
            setShowBoard(!showBoard);
          }}
        >
          {!showBoard ? "Show Board" : "Hide Board"}
        </button>
        <div className="content-center justify-center items-center justify-items-center overflow-hidden">
          {showBoard && (
            <div className="max-w-1/3 max-h-1/3 min-h-64 min-w-64 p-4 overflow-hidden rounded-md">
              <Chessboard
                id="Board"
                position={gameFen}
                arePiecesDraggable={false}
                customBoardStyle={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                }}
                customDarkSquareStyle={{
                  backgroundColor: "#8b5cf6",
                }}
                customLightSquareStyle={{
                  backgroundColor: "#ecfdf5",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayerInterface;
