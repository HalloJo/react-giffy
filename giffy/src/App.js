import React, { Component } from "react";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: value,
    }));
    if (value.length > 2) {
    }
  };
  handleKeyPress = (event) => {
    const { value } = event.target;
    if (value.length > 2 && event.key === "Enter") {
      alert(`Search for ${value}`);
    }
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="page">
        <Header />
        <div className="search grid">
          <input
            className="input grid-item"
            placeholder="Type something.."
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
      </div>
    );
  }
}

export default App;
