import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="jumbotron">
          <p align="center">Task {this.props.searchVal} not found</p>
        </div>
      </div>
    );
  }
}
