import React from 'react';
import { Table, Col } from 'reactstrap';
import PropTypes from 'prop-types';

const DetailView = props => {
  const { renderMainDetails, renderAdditionalDetails } = props;

  return (
    <Col sm="12" md={{ size: 8, offset: 2 }}>
      <Table borderless className="kaznet-table details">
        <tbody>
          {renderMainDetails}
          <tr>
            <td className="kaznet-title-h1">Details</td>
          </tr>
          {renderAdditionalDetails}
        </tbody>
      </Table>
    </Col>
  );
};

DetailView.propTypes = {
  renderMainDetails: PropTypes.shape({}).isRequired,
  renderAdditionalDetails: PropTypes.shape({}).isRequired
};

export default DetailView;
