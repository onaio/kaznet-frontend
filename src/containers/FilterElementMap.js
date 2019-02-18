// / This Component takes an object of Filter Fields,
// / an array of isOpen States & an array of handleChange functions for
// / Filter Fields arranged in order according to the Filter Field Object values,
// / an optional array of strings and optional array of Filter Fields Position and returns the Filter Fields
// / as a Dropdown wrapped around the provided HTML tag optionally combined
// / with the array of strings ordered in specified Filter Fields Positon wrapped around its provided HTML tag
import React, { Component } from 'react';
import { DropdownToggle, DropdownMenu, Dropdown } from 'reactstrap';
import PropTypes from 'prop-types';

import ElementMap from './ElementMap';

export default class FilterElementMap extends Component {
  // Sets runtime typechecking for Component Props
  // Ensure props passed to FilterElementMap are of right type
  // and required props are present
  static propTypes = {
    filterFields: PropTypes.object.isRequired,
    isOpenStates: PropTypes.arrayOf(PropTypes.bool).isRequired,
    handleChangeFunctions: PropTypes.arrayOf(PropTypes.func).isRequired,
    HTMLTag: PropTypes.string.isRequired,
    filterItemPositions: PropTypes.arrayOf(PropTypes.number),
    listItems: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const { filterFields } = this.props;
    const filterFieldsList = [];
    const itemList = [];
    const { isOpenStates } = this.props;
    const { handleChangeFunctions } = this.props;

    Object.entries(filterFields).map(([name, dropDownItems], index) => {
      filterFieldsList.push(
        <Dropdown key={index} isOpen={isOpenStates[index]} toggle={handleChangeFunctions[index]}>
          <DropdownToggle caret tag="span" className="nav-link">
            {name}
          </DropdownToggle>
          <DropdownMenu>{dropDownItems}</DropdownMenu>
        </Dropdown>
      );

      return null;
    });

    if (this.props.listItems) {
      if (this.props.filterItemPositions) {
        const { filterItemPositions } = this.props;
        itemList.push(...this.props.listItems);

        for (let i = 0; i < filterItemPositions.length; i++) {
          itemList.splice(filterItemPositions[i], 0, filterFieldsList[i]);
        }
      } else {
        itemList.push(...filterFieldsList);
        itemList.push(...this.props.listItems);
      }
    } else {
      itemList.push(filterFieldsList);
    }

    return (
      <ElementMap items={itemList} HTMLTag={this.props.HTMLTag} className={this.props.className} />
    );
  }
}
