// This component takes an `objectsById` object
// and returns them  wrapped in the provided HTML tag
import React, { Component } from 'react';

export class OptionMap extends Component {
  render() {
    const { obj } = this.props;
    const { additionalObj } = this.props;

    const listItems = Object.entries(obj).map(item => (
      <option key={item[0]} value={item[0]}>
        {item[1].attributes[this.props.titleField]}
      </option>
    ));

    // Adds a Single Object to the list of Items
    if (additionalObj != null) {
      listItems.push(
        <option key={additionalObj.id} value={additionalObj.id}>
          {additionalObj.attributes[this.props.titleField]}
        </option>
      );
    }

    listItems.unshift(
      <option key={0} value="">
        ----
      </option>
    );
    return listItems;
  }
}
