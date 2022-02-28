import React, { Component } from "react";
import Header from "./components/Header";
import Userhint from "./components/Userhint";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hintText: "",
      gif: "",
    };
  }

  searchGiphy = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=rGcYJZqhoYZBJXKR0TKyTDuyBku64SLR&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
      );
      const { data } = await response.json();

      this.setState((prevState, props) => ({
        ...prevState,
        gif: data[0],
      }));
    } catch (error) {}
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
          {gif && (
            <video
              className="grid-item video"
              autoPlay
              loop
              src={gif.images.original.mp4}
            />
          )}
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
