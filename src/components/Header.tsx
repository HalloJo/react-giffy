import React from "react";
import clearButton from "../images/close-icon.svg";

const Header = ({
  clearSearch,
  hasResults,
  limit,
}: {
  clearSearch: () => void;
  hasResults: number;
  limit: boolean;
}) => (
  <header className="header grid">
    {hasResults ? (
      <button onClick={clearSearch}>
        <img alt="Clear button" src={clearButton} />
      </button>
    ) : (
      <h1 className="title">
        {limit ? "Limit reached, search something else! :D" : "Jiffy"}
      </h1>
    )}
  </header>
);

export default Header;
