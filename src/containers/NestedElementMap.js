import React, { Component } from 'react';
import ElementMap from './ElementMap';

export default class NestedElementMap extends Component {
  render() {
    const { detailitems } = this.props;
    const details = [];
    let counter = 1;

    for (const [key, value] of Object.entries(detailitems)) {
      details.push(
        React.createElement('tr', { key }, [
          <ElementMap
            key={counter}
            items={[key]}
            HTMLTag={this.props.HTMLTag}
            className="kaznet-title-td"
          />,
          // Need the key to be different as such we are multiplying it by 20 from the first one.
          <ElementMap key={counter * 20} items={[value]} HTMLTag={this.props.HTMLTag} />
        ])
      );
      counter++;
    }

    return details;
  }
}
