import Players from "./components/Players";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBOS } from "./winning-combo";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePLayer(gameLog) {
  let currentplayer = "X";

  if (gameLog.length > 0 && gameLog[0].player === "X") {
    currentplayer = "O";
  }
  return currentplayer;
}

function deriveWinner(board, currentName) {
  let winner;

  for (const combo of WINNING_COMBOS) {
    const firstSquare = board[combo[0].row][combo[0].col];
    const secondSquare = board[combo[1].row][combo[1].col];
    const thirdSquare = board[combo[2].row][combo[2].col];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = currentName[firstSquare];
    }
  }
  return winner;
}

function deriveDraw(gameLog) {
  let board = [...INITIAL_BOARD.map((innerArray) => [...innerArray])];

  for (const turn of gameLog) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
}

function App() {
  const [gameLog, setGameLog] = useState([]);
  const [currentName, setCurrentName] = useState(PLAYERS);

  const activePlayer = deriveActivePLayer(gameLog);

  const board = deriveDraw(gameLog);

  const winner = deriveWinner(board, currentName);

  const draw = gameLog.length === 9 && !winner;

  function togglePlayer(rowIndex, colIndex) {
    // setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    setGameLog((prevLog) => {
      const currentplayer = deriveActivePLayer(prevLog);

      const newLog = [
        { square: { row: rowIndex, col: colIndex }, player: currentplayer },
        ...prevLog,
      ];

      return newLog;
    });
  }
  function handleRestart() {
    setGameLog([]);
  }

  function handleNameChange(symbol, newName) {
    setCurrentName((prevName) => {
      return {
        ...prevName,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            intialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChange={handleNameChange}
          />
          <Players
            intialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChange={handleNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard activePlayer={togglePlayer} board={board} />
      </div>
      <Log turns={gameLog} />
    </main>
  );
}

export default App;
