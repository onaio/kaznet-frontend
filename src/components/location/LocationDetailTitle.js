// Renders the detail page title section
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  Badge,
  Modal,
  ModalHeader,
  ModalFooter,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import "../page/DetailTitle.css";

export default class LocationDetailTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <section className="detail-page-title">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div>
            <h1 className="kaznet-detail-title">
              <Link to="/locations" className="kaznet-header-link">
                Locations
              </Link>{" "}
              > {this.props.location.attributes.name}
            </h1>
            <p className="kaznet-creation-detail">
              {"By "}
              {this.props.location.attributes.created_by_name},{" "}
              <Moment format="DD-MM-YYYY">
                {this.props.location.attributes.created}
              </Moment>
            </p>
            <Col md="12">
              <Row className="kaznet-action-links">
                <Link
                  to={`/locations/${this.props.location.id}/edit`}
                  className="action-link"
                >
                  EDIT
                </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                <Button
                  color="link"
                  className="remove_button_css action-link action-link-alert"
                  onClick={this.toggle}
                >
                  DELETE LOCATION
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle}>
                    Are you sure you want to delete this Location?
                  </ModalHeader>
                  <ModalFooter>
                    <Link
                      to={`/locations/${this.props.location.id}/delete`}
                      className="btn btn-danger"
                      onClick={this.toggle}
                    >
                      Delete Location
                    </Link>
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </Row>
            </Col>
          </div>
        </Col>
      </section>
    );
  }
}
