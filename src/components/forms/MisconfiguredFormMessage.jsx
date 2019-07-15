import React from 'react';

import { ONA_WEBSITE, WEBSITE_NAME } from '../../constants';

function MisconfiguredFormMessage() {
  return (
    <div>
      <p>
        This form may not appear correctly in the&nbsp;
        {WEBSITE_NAME}
        &nbsp;mobile app. Additionally, it
        <strong>&nbsp;may not be possible to submit data&nbsp;</strong>
        to this form. Please&nbsp;
        <a href={`${ONA_WEBSITE}`} target="_blank" rel="noopener noreferrer">
          click this link to fix this form
        </a>
        . You can fix it be ensuring that:
      </p>
      <ol>
        <li>The form belongs to the right organisation</li>
        <li>The form exists in a project which allows its members to make form submissions</li>
      </ol>
    </div>
  );
}

export default MisconfiguredFormMessage;
