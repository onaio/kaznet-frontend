import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import ExportModal from '../../components/ExportModal';

const StatisticsSection = props => {
  const {
    downloadModalHandler,
    task,
    formURL,
    xformTableURL,
    accepted,
    totalSubmissions,
    reward,
    review,
    rejected,
    modalState,
    className,
    onFormSubmit,
    taskName
  } = props;

  return (
    <Col sm="12" md={{ size: 8, offset: 2 }}>
      <Row>
        <Col sm="3" className="kaznet-sub">
          <p className="kaznet-stats-count">
            {totalSubmissions}
            &nbsp;Submissions
          </p>
        </Col>
        <Col sm="9" className="kaznet-sub">
          {task && task.attributes.xform_title ? (
            <a
              href={formURL}
              className="btn btn-primary text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon="clone" />
              Review all submissions
            </a>
          ) : (
            ''
          )}
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <Row>
            <Col sm="6" className="kaznet-no-gutter">
              <div className="kaznet-stats">
                <p className="stats-data">{accepted}</p>
                <p className="stats-header">
                  Accepted
                  {xformTableURL !== null && (
                    <a href={xformTableURL} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon
                        icon="external-link-alt"
                        className="fa-xs icon-link withspace"
                      />
                    </a>
                  )}
                </p>
              </div>
            </Col>
            <Col sm="6" className="kaznet-no-gutter left-fix">
              <div className="kaznet-stats">
                <p className="stats-data">{reward}</p>
                <p className="stats-header">
                  Total Reward
                  {accepted > 0 && (
                    <FontAwesomeIcon
                      icon="laptop"
                      className="fa-xs icon-link withspace clickable-icon"
                      onClick={downloadModalHandler}
                    />
                  )}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm="6" className="overflow-fix">
          <Row>
            <Col sm="6" className="kaznet-stats-col">
              <div className="kaznet-stats">
                <h1 className="stats-data">{review}</h1>
                <p className="stats-header">
                  Needs Review
                  {xformTableURL !== null && (
                    <a href={xformTableURL} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon
                        icon="external-link-alt"
                        className="fa-xs icon-link withspace"
                      />
                    </a>
                  )}
                </p>
              </div>
            </Col>
            <Col sm="6" className="kaznet-stats-col">
              <div className="kaznet-stats overflow-fix">
                <h1 className="stats-data">{rejected}</h1>
                <p className="stats-header">
                  Rejected
                  {xformTableURL !== null && (
                    <a href={xformTableURL} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon
                        icon="external-link-alt"
                        className="fa-xs icon-link withspace"
                      />
                    </a>
                  )}
                </p>
              </div>
            </Col>
          </Row>
          <ExportModal
            modalState={modalState}
            downloadModalHandler={downloadModalHandler}
            className={className}
            onFormSubmit={onFormSubmit}
            name={taskName}
          />
        </Col>
      </Row>
      <hr />
    </Col>
  );
};

StatisticsSection.propTypes = {
  downloadModalHandler: PropTypes.func.isRequired,
  task: PropTypes.shape({
    attributes: PropTypes.shape({
      xform_title: PropTypes.string
    })
  }).isRequired,
  formURL: PropTypes.string.isRequired,
  xformTableURL: PropTypes.string.isRequired,
  accepted: PropTypes.number.isRequired,
  totalSubmissions: PropTypes.number.isRequired,
  reward: PropTypes.number.isRequired,
  review: PropTypes.number.isRequired,
  rejected: PropTypes.number.isRequired,
  modalState: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  taskName: PropTypes.string.isRequired
};

export default StatisticsSection;
