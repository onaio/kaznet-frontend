// Renders the detail page title section
import React, { Component } from 'react';
import { Row, Col, Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../page/DetailTitle.scss';

export default class LocationDetailTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { modal } = this.state;

    this.setState({
      modal: !modal
    });
  }

  render() {
    const { location, className } = this.props;
    const { modal } = this.state;

    const locationData = location.attributes;
    const locationID = location.id;

    return (
      <section className="detail-page-title">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div>
            <h1 className="kaznet-detail-title">
              <Link to="/locations" className="kaznet-header-link">
                Locations
              </Link>
              &nbsp;&gt;&nbsp;
              {locationData.name}
            </h1>
            <Col md="12">
              <Row className="kaznet-action-links">
                <Link to={`/locations/${locationID}/edit`} className="action-link">
                  EDIT
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                {locationData.has_submissions === true && (
                  <div>
                    <p className="text-muted">DELETE LOCATION</p>
                  </div>
                )}
                {locationData.has_submissions === false && (
                  <div>
                    <Button
                      color="link"
                      className="remove_button_css action-link action-link-alert"
                      onClick={this.toggle}
                      aria-label="DELETE LOCATION"
                    >
                      DELETE LOCATION
                    </Button>
                    <Modal isOpen={modal} toggle={this.toggle} className={className}>
                      <ModalHeader toggle={this.toggle}>
                        Are you sure you want to delete this Location?
                      </ModalHeader>
                      <ModalFooter>
                        <Link
                          to={`/locations/${locationID}/delete`}
                          className="btn btn-danger"
                          onClick={this.toggle}
                        >
                          Delete Location
                        </Link>
                        <Button color="secondary" onClick={this.toggle} aria-label="Cancel">
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                )}
              </Row>
            </Col>
          </div>
        </Col>
      </section>
    );
  }
}

LocationDetailTitle.propTypes = {
  location: PropTypes.shape({
    attributes: {},
    id: PropTypes.number
  }).isRequired,
  className: PropTypes.string.isRequired
};
