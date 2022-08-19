import React from "react";
import Squares from "./Squares";

const Board = (props) => {
  // console.log(props)
  return (
    <div className="board">
      {props.squares.map((square, index) => (
        <Squares
          key={index}
          value={square}
          onClick={() => props.onClick(index)}
        ></Squares>
      ))}
    </div>
  );
};

export default Board;
