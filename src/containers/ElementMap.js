// This component takes a list of strings
// and returns them wrapped in the provided HTML tag
import React, { Component } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import PropTypes from "prop-types";

export default class ElementMap extends Component {
  static propTypes = {
    filterFields: PropTypes.object
  };

  render() {
    const items = this.props.items;
    // use React.createElement to create the html tag
    // in a dynamic way
    const listItems = items.map((item, index) =>
      React.createElement(
        this.props.HTMLTag,
        { key: index, className: this.props.className },
        [item]
      )
    );

    if (this.props.filterFields != null) {
      /// Check for filterFields prop
      /// If present create a DropDown wrapped inside specified
      /// HTMLTag prop.
      const sortItems = Object.entries(this.props.filterFields).map(
        ([name, dropDownItems], index) => {
          const uniqueKey = 2 * listItems.length;
          return React.createElement(
            this.props.HTMLTag,
            { key: uniqueKey + index, className: this.props.className },
            [
              <Dropdown
                key={uniqueKey * 2}
                isOpen={this.props.isOpen}
                toggle={e => this.props.handleChange(e)}
              >
                <DropdownToggle caret tag="span" className="nav-link">
                  {name}
                </DropdownToggle>
                <DropdownMenu>{dropDownItems}</DropdownMenu>
              </Dropdown>
            ]
          );
        }
      );

      /// Modify listItems to Include Filter Fields in Specified Position in
      /// this.props.filterItemPositions
      for (var i = 0; i < this.props.filterItemPositions.length; i++) {
        listItems.splice(this.props.filterItemPositions[i], 0, sortItems[i]);
      }
    }

    return listItems;
  }
}
