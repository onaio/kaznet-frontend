import React, { Component } from "react";

export default class NoResults extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="jumbotron bg-white">
          <p align="center">
            Sorry, we could not find any results matching "{
              this.props.searchVal
            }".
          </p>
          <p align="center">Please try again?</p>
        </div>
      </div>
    );
  }
}
