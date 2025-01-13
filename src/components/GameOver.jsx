export default function GameOver({ winner, onRestart, name }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p> {winner} wins!</p>}
      {!winner && <p>It's a draw!</p>}
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
