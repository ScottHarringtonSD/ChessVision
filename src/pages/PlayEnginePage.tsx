import { postChessApi } from "../api/queries";

const PlayEnginePage = () => {
  const apiResponse = postChessApi({
    fen: "8/1P1R4/n1r2B2/3Pp3/1k4P1/6K1/Bppr1P2/2q5 w - - 0 1",
    depth: 2,
  }).toString();
  return (
    <>
      <div>{apiResponse}</div>
    </>
  );
};

export default PlayEnginePage;
