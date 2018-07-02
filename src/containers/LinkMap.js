// This component takes an object of links
// and returns them as react-router Link objects
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LinkMap extends Component {
  render() {
    const links = this.props.links;
    const listLinks = [];

    for (const [key, value] of Object.entries(links)) {
      listLinks.push(
        <Link to={value} key={key} className="action-link">
          {key}
        </Link>
      );
    }

    return listLinks;
  }
}
