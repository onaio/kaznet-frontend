// This component takes an `objectsById` object
// and returns them  wrapped in the provided HTML tag
import React, { Component } from "react";

export class OptionMap extends Component {
  render() {
    const obj = this.props.obj;

    if (obj != null) {
      var listItems = Object.entries(obj).map(item => (
        <option key={item[0]} value={item[0]}>
          {item[1].attributes[this.props.titleField]}
        </option>
      ));
    } else {
      const list = this.props.list;
      listItems = [];

      for (var counter in list) {
        listItems.push(
          // We add one since counter starts at 0
          // and clashes with line29s key
          <option key={counter + 1} value={counter + 1}>
            {list[counter].attributes[this.props.titleField]}
          </option>
        );
      }
    }
    listItems.unshift(<option key={0}>----</option>);
    return listItems;
  }
}
