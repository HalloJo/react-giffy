import React, { ChangeEvent, useRef, useState } from "react";
import Header from "./components/Header";
import Gif from "./components/Gif";
import Userhint from "./components/Userhint";
import { GifProps } from "./types/types";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hintText, setHintText] = useState<string>("");
  const [gifs, setGifs] = useState<GifProps[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const hasResults = gifs.length;

  const randomChoice = (array: GifProps[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const searchGiphy = async (searchTerm: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=rGcYJZqhoYZBJXKR0TKyTDuyBku64SLR&q=${searchTerm}&limit=30&offset=0&rating=g&lang=en`
      );
      const { data } = await response.json();

      if (!data.length) {
        const errorMessage = `Nothing found for ${searchTerm}`;
        throw errorMessage;
      }

      const uniqueGifs = data.filter(
        (gif: GifProps) =>
          !gifs.some((existingGif) => existingGif.id === gif.id)
      );

      const randomGif = randomChoice(uniqueGifs);

      setGifs((previousGifs) => [...previousGifs, randomGif]);

      setLoading(false);
      setHintText(`Hit enter to see more ${searchTerm}`);
    } catch (error: unknown) {
      setHintText(error as string);
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchTerm(value);
    setHintText(value.length > 2 ? `Hit enter to search ${value}` : "");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.value && target.value.length > 2 && event.key === "Enter") {
      if (gifs.length === 25) {
        clearSearch();
        setLimit(true);
      } else {
        setLimit(false);
        searchGiphy(target.value);
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setHintText("");
    setGifs([]);
    inputRef.current?.focus();
  };

  return (
    <div className="page">
      <Header clearSearch={clearSearch} hasResults={hasResults} limit={limit} />
      <div className="search grid">
        {gifs.map((gif) => (
          <Gif key={gif.id} {...gif} />
        ))}
        <input
          className="input grid-item"
          placeholder="Type something.."
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          value={searchTerm}
          ref={inputRef}
        />
      </div>
      <Userhint loading={loading} hintText={hintText} />
    </div>
  );
};

export default App;
