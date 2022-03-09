import React, { Component } from "react";
import Header from "./components/Header";
import Gif from "./components/Gif";
import Userhint from "./components/Userhint";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchTerm: "",
      hintText: "",
      gif: "",
      gifs: [],
    };
  }

  randomChoice = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  searchGiphy = async (searchTerm) => {
    this.setState({
      loading: true,
    });
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=rGcYJZqhoYZBJXKR0TKyTDuyBku64SLR&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
      );
      const { data } = await response.json();

      if (!data.length) {
        throw `Nothing found for ${searchTerm}`;
      }

      const randomGif = this.randomChoice(data);

      this.setState((prevState, props) => ({
        ...prevState,
        gif: randomGif,
        gifs: [...prevState.gifs, randomGif],
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`,
      }));
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false,
      }));
    }
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: value,
      hintText: value.length > 2 ? `Hit enter to search ${value}` : "",
    }));
  };

  handleKeyPress = (event) => {
    const { value } = event.target;
    if (value.length > 2 && event.key === "Enter") {
      this.searchGiphy(value);
    }
  };

  render() {
    const { searchTerm, gif } = this.state;

    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {this.state.gifs.map((gif) => (
            <Gif {...gif} />
          ))}
          <input
            className="input grid-item"
            placeholder="Type something.."
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        <Userhint {...this.state} />
      </div>
    );
  }
}

export default App;
