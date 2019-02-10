import React, { Component } from "react";

import { ONA_WEBSITE, WEBSITE_NAME } from "../../constants";

export default class MisconfiguredFormMessage extends Component {
  render() {
    return (
      <div>
        <p>
          This form may not appear correctly in the {WEBSITE_NAME} mobile app.
          Additionally, it <strong>may not be possible to submit data</strong>{" "}
          to this form. Please{" "}
          <a href={ONA_WEBSITE} target="_blank">
            click this link to fix this form
          </a>. You can fix it be ensuring that:
        </p>
        <ol>
          <li>The form belongs to the right organisation</li>
          <li>
            The form exists in a project which allows its members to make form
            submissions
          </li>
        </ol>
      </div>
    );
  }
}
