import React, { Component } from "react";
// import * as constants from "../constants.js";
export default class NoResults extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="jumbotron bg-white">
          <p align="center">
            Sorry, we could not find any results matching <br /> "{this.props
              .searchVal !== ""
              ? "status you selected"
              : "The your search or status "}".
          </p>
          <p align="center">Please try again?</p>
        </div>
      </div>
    );
  }
}
