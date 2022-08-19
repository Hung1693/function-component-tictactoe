import React, { useState } from "react";
import Board from "./Board";

import "./GameStyle.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    /**check if squares[a] = squares[b] = square[c] = 'X' or 'O'. We will pass array state.square later in component Board */
    if (
      squares[a] != null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

const Game = (props) => {
  //useState hook
  const [xIsNext, setXIsNext] = useState(false);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [turn, setTurn] = useState(0);

  const currentHist = history;
  const current = currentHist[turn];
  let status;
  const winner = calculateWinner(current.squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (index) => {
    const currentHist = history.slice(0, turn + 1);
    const current = currentHist[currentHist.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[index]) return;
    squares[index] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);

    //update history state from currentHist
    setHistory(currentHist.concat([{ squares: squares }]));
    //because there is no turn = 0
    setTurn(currentHist.length);
  };

  const jumpTo = (step) => {
    setTurn(step);
    setXIsNext(step % 2 === 0);
  };

  //move is index of the newest square index added into history array
	const move = history.map((step, move) => {
		console.log(move);
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <h1>Game TicTacToe</h1>
        <Board squares={current.squares} onClick={handleClick}></Board>
      </div>
      <div className="game-info">
        <h1>{status}</h1>
        <ol>{move}</ol>
      </div>
    </div>
  );
};

export default Game;
