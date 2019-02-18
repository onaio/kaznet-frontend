// This component takes a list of strings
// and returns them wrapped in the provided HTML tag
import React, { Component } from 'react';

export default class ElementMap extends Component {
  render() {
    const { items } = this.props;
    // use React.createElement to create the html tag
    // in a dynamic way
    const listItems = items.map((item, index) =>
      React.createElement(this.props.HTMLTag, { key: index, className: this.props.className }, [
        item
      ])
    );

    return listItems;
  }
}
