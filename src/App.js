import React, { Component, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Gif from "./components/Gif";
import Userhint from "./components/Userhint";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hintText, setHintText] = useState("");
  const [gifs, setGifs] = useState([]);

  const inputRef = useRef(null);

  const hasResults = gifs.length;

  const randomChoice = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const searchGiphy = async (searchTerm) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=rGcYJZqhoYZBJXKR0TKyTDuyBku64SLR&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
      );
      const { data } = await response.json();

      if (!data.length) {
        const errorMessage = `Nothing found for ${searchTerm}`;
        throw errorMessage;
      }

      const randomGif = randomChoice(data);

      setGifs([...gifs, randomGif]);
      setLoading(false);
      setHintText(`Hit enter to see more ${searchTerm}`);
    } catch (error) {
      setHintText(error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchTerm(value);
    setHintText(value.length > 2 ? `Hit enter to search ${value}` : "");
  };

  const handleKeyPress = (event) => {
    const { value } = event.target;
    if (value.length > 2 && event.key === "Enter") {
      searchGiphy(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setHintText("");
    setGifs([]);
    inputRef.current.focus();
  };

  return (
    <div className="page">
      <Header clearSearch={clearSearch} hasResults={hasResults} />
      <div className="search grid">
        {gifs.map((gif) => (
          <Gif key={gif.id} {...gif} />
        ))}
        <input
          className="input grid-item"
          placeholder="Type something.."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={searchTerm}
          ref={inputRef}
        />
      </div>
      <Userhint loading={loading} hintText={hintText} />
    </div>
  );
};

export default App;
