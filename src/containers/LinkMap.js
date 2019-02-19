// This component takes an object of links
// and returns them as react-router Link objects
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LinkMap extends Component {
  render() {
    const { links } = this.props;
    const listLinks = [];
    let counter = 1;

    for (const [key, value] of Object.entries(links)) {
      if (key === 'DELETE TASK') {
        listLinks.push(
          <Link to={value} key={key} className="action-link-alert">
            {key}
          </Link>
        );
      } else {
        listLinks.push(
          <Link to={value} key={key} className="action-link">
            {key}
          </Link>
        );
      }

      // Using counter to generate unique keys for the
      // action-link-divider elements
      listLinks.push(
        <p key={counter} className="action-link-divider">
          |
        </p>
      );

      counter++;
    }

    // Removes last action-link-divider
    listLinks.pop();

    return listLinks;
  }
}
