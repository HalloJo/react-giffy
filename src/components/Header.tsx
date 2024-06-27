import React from "react";
import clearButton from "../images/close-icon.svg";

const Header = ({ clearSearch, hasResults }) => (
  <header className="header grid">
    {hasResults ? (
      <button onClick={clearSearch}>
        <img alt="Clear button" src={clearButton} />
      </button>
    ) : (
      <h1 className="title">Jiffy</h1>
    )}
  </header>
);

export default Header;
