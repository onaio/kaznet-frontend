// Renders the detail page title section
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Col, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './DetailTitle.scss';

const getStatusClassName = status => {
  const allowedStatuses = ['Active', 'Draft', 'Deactivated', 'Archived', 'Expired', 'Scheduled'];

  if (allowedStatuses.includes(status)) return `badge-${status.toLowerCase()}`;
  return '';
};

const DetailPageTitle = props => {
  const { actionLinks, detailName, status, pageTitle, pageTarget } = props;

  return (
    <section className="detail-page-title">
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <div>
          <h1 className="kaznet-detail-title">
            <Link to={pageTarget} className="kaznet-header-link">
              {pageTitle}
            </Link>
            &nbsp;&gt;&nbsp;
            {detailName}
            {status != null ? (
              <Badge className={`kaznet-badge ${getStatusClassName(status)}`}>{status}</Badge>
            ) : null}
          </h1>
          <p className="kaznet-creation-detail">By Jensen Nathan, 21 May 2018</p>
          <Col md="12">
            <Row className="kaznet-action-links">
              {/* Method maybe? to auto generate this links */}
              {actionLinks}
              <Link to="/" className="action-link archive-button">
                <FontAwesomeIcon icon="folder-open" className="withspace" />
                Archive
              </Link>
            </Row>
          </Col>
        </div>
      </Col>
    </section>
  );
};

DetailPageTitle.propTypes = {
  actionLinks: PropTypes.element.isRequired,
  detailName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  pageTarget: PropTypes.string.isRequired
};

export default DetailPageTitle;
