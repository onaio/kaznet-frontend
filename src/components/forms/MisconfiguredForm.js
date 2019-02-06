// Renders the detail page title section
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

import { KAZNET_COLOR, ONA_WEBSITE, WEBSITE_NAME } from "../../constants";

import "./MisconfiguredForm.css";

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
          color={KAZNET_COLOR}
          onClick={this.toggle}
          style={{ cursor: "pointer" }}
        />
        <Popover
          placement="right"
          isOpen={this.state.popoverOpen}
          target={`Popover-${this.props.form.id}`}
          toggle={this.toggle}
        >
          <PopoverHeader>This form is not configured correctly</PopoverHeader>
          <PopoverBody>
            <p>
              This form may not appear correctly in the {WEBSITE_NAME} mobile
              app. Additionally, it{" "}
              <strong>may not be possible to submit data</strong> to this form.
              Please <a href={ONA_WEBSITE}>click this link to fix this form</a>.
              You can fix it be ensuring that:
            </p>
            <ol>
              <li>The form belongs to the right organisation</li>
              <li>
                The form exists in a project which allows its members to make
                form submissions
              </li>
            </ol>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}
