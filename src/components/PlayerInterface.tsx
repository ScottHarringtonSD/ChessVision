import { useEffect, useState } from "react";
import { postChessApi } from "../api/queries";
import { StockfishResponse } from "../api/StockfishResponse";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { getRandomInt, shuffle } from "./helper";

export type PlayerInterfaceProps = {
  difficulty: string;
  startFEN: string;
  startColour?: string | undefined;
};

const PlayerInterface = ({
  difficulty,
  startFEN,
  startColour,
}: PlayerInterfaceProps) => {
  const [engineResponse, setEngineResponse] = useState<StockfishResponse>();
  const [loading, setLoading] = useState(false);
  const [gameFen, setGameFen] = useState(startFEN);
  const [runEngine, setRunEngine] = useState(false);
  const [error, setError] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const [gameEnd, setGameEnd] = useState<string>("");
  const [engineMove, setEngineMove] = useState("");
  const [playerColour, setPlayerColour] = useState<string | undefined>(
    startColour
  );

  const getDepth = () => {
    if (difficulty === "easy") {
      return getRandomInt(2, 2);
    } else if (difficulty === "medium") {
      return getRandomInt(2, 4);
    } else if (difficulty === "hard") {
      return getRandomInt(2, 7);
    } else {
      return 12;
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
        (moveInput as HTMLInputElement).value = "";
        if (chessboard.isDraw()) {
          setGameEnd("Draw");
        } else if (chessboard.isStalemate()) {
          setGameEnd("Stalemate");
        } else if (chessboard.isCheckmate()) {
          setGameEnd("Win");
        } else {
          setGameFen(chessboard.fen().toString());
          if (difficulty === "easy") {
            const randomMoveChance = getRandomInt(1, 5);
            if (randomMoveChance === 5) {
              const fullMoveOptionList: string[] = shuffle(chessboard.moves());
              chessboard.move(fullMoveOptionList[0], { strict: false });
              setGameFen(chessboard.fen().toString());
              setEngineMove(fullMoveOptionList[0]);
            } else {
              setRunEngine(true);
            }
          }

          if (difficulty === "medium") {
            const randomMoveChance = getRandomInt(1, 8);
            if (randomMoveChance === 8) {
              const fullMoveOptionList: string[] = shuffle(chessboard.moves());
              chessboard.move(fullMoveOptionList[0], { strict: false });
              setGameFen(chessboard.fen().toString());
            } else {
              setRunEngine(true);
            }
          }

          if (difficulty === "hard") {
            const randomMoveChance = getRandomInt(1, 12);
            if (randomMoveChance === 12) {
              const fullMoveOptionList: string[] = shuffle(chessboard.moves());
              chessboard.move(fullMoveOptionList[0], { strict: false });
              setGameFen(chessboard.fen().toString());
            } else {
              setRunEngine(true);
            }
          }
          if (difficulty === "engine") {
            setRunEngine(true);
          }
        }
      } else {
        setError("Invalid Move. Please try again.");
      }
    }
  };

  if (playerColour === "b") {
    setPlayerColour("");
    loadEngineResponse();
  }

  useEffect(() => {
    if (runEngine) {
      loadEngineResponse();
    }
  }, [runEngine]);

  useEffect(() => {
    const chessboard = new Chess(gameFen);
    if (engineResponse) {
      chessboard.move(engineResponse.san, { strict: false });
      if (chessboard.isDraw()) {
        setGameEnd("Draw");
      }
      if (chessboard.isStalemate()) {
        setGameEnd("Stalemate");
      }
      if (chessboard.isCheckmate()) {
        setGameEnd("Loss");
      }
      setGameFen(chessboard.fen().toString());
      setEngineMove(engineResponse.san);
    }
  }, [engineResponse, gameFen]);

  useEffect(() => {
    setGameFen(startFEN);
    setError("");
    setGameEnd("");
    setEngineMove("");
    const moveInput = document.getElementById("moveSubmission");
    if (moveInput) {
      (moveInput as HTMLInputElement).value = "";
    }
  }, [startFEN]);

  return (
    <>
      <div className="text-center p-2 text-2xl">
        Engine Move: {loading && <span>Response Loading...</span>}{" "}
        {engineMove && !loading && engineMove}
      </div>
      {gameEnd === "" && (
        <div className="content-center justify-center p-2 text-center">
          <input
            id="moveSubmission"
            type="text"
            className="bg-violet-950 p-3 rounded-sm"
            placeholder="Player move..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitMove();
              }
            }}
          ></input>
          <button
            className="rounded-sm bg-emerald-800 text-center p-3 mx-3"
            onClick={submitMove}
          >
            Submit move
          </button>
        </div>
      )}
      {gameEnd === "Draw" && (
        <div className="content-center justify-center p-2 text-center">
          <div className="text-center text-2xl mx-40 pb-4">Game Drawn</div>
        </div>
      )}
      {gameEnd === "Stalemate" && (
        <div className="content-center justify-center p-2 text-center">
          <div className="text-center text-2xl mx-40 pb-4">Stalemate</div>
        </div>
      )}
      {gameEnd === "Win" && (
        <div className="content-center justify-center p-2 text-center">
          <div className="text-center text-2xl mx-40 pb-4">
            Win by checkmate
          </div>
        </div>
      )}
      {gameEnd === "Loss" && (
        <div className="content-center justify-center p-2 text-center">
          <div className="text-center text-2xl mx-40 pb-4">
            Lose by checkmate
          </div>
        </div>
      )}
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
        <button
          className="rounded-sm bg-emerald-800 text-center p-3 mx-3 w-28"
          onClick={() => {
            setGameFen(startFEN);
            setError("");
            setGameEnd("");
            setShowBoard(false);
            setEngineMove("");
            const moveInput = document.getElementById("moveSubmission");
            if (moveInput) {
              (moveInput as HTMLInputElement).value = "";
            }
          }}
        >
          Restart
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
