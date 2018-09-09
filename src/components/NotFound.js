import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="jumbotron bg-white">
          <p align="center">
            Sorry, we couldn't find any results matching "{this.props.searchVal}".
          </p>
          <p align="center">Please try again?</p>
        </div>
      </div>
    );
  }
}
