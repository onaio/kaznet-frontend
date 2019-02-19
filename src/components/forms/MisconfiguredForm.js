// Renders the detail page title section
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import MisconfiguredFormMessage from './MisconfiguredFormMessage';
import { MAIN_COLOR } from '../../constants';

import './MisconfiguredForm.css';

export default class MisconfiguredForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <span>
        &nbsp;&nbsp;
        <FontAwesomeIcon
          id={`Popover-${this.props.form.id}`}
          icon="exclamation-circle"
          color={MAIN_COLOR}
          onClick={this.toggle}
          style={{ cursor: 'pointer' }}
        />
        <Popover
          placement="right"
          isOpen={this.state.popoverOpen}
          target={`Popover-${this.props.form.id}`}
          toggle={this.toggle}
        >
          <PopoverHeader>This form is not configured correctly</PopoverHeader>
          <PopoverBody>
            <MisconfiguredFormMessage />
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}
