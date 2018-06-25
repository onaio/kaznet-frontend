// This component takes an `objectsById` object
// and returns them  wrapped in the provided HTML tag
import React, { Component } from "react";

export class OptionMap extends Component {
  render() {
    const obj = this.props.obj;

    const listItems = Object.entries(obj).map(item => (
      <option key={item[0]} value={item[0]}>
        {item[1].attributes[this.props.titleField]}
      </option>
    ));
    return listItems;
  }
}
