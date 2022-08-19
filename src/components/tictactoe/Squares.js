import { computeHeadingLevel } from "@testing-library/react";
import React from "react";

const Squares = (props) => {
  const { value, onClick } = props;
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
};

export default Squares;
