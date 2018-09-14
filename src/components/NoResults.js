import React, { Component } from "react";
export default class NoResults extends Component {
  goBack = () => {
    window.history.back();
  };
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
          <center>
            <button
              onClick={() => {
                this.goBack();
              }}
              className="btn btn-primary btn-lg"
            >
              Go Back
            </button>
          </center>
        </div>
      </div>
    );
  }
}
