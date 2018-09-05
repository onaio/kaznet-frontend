// Renders the detail page title section
import React, { Component } from "react";
import { Row, Col, Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import "../page/DetailTitle.css";
import { ADMIN_ROLE } from "../../constants";

export default class UserDetailTitle extends Component {
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
              <Link to="/users" className="kaznet-header-link">
                Users
              </Link>{" "}
              > {this.props.user.attributes.ona_username}
            </h1>
            <p className="kaznet-creation-detail">
              {"By "}
              {this.props.user.attributes.created_by_name},{" "}
              <Moment format="DD-MM-YYYY">
                {this.props.user.attributes.created}
              </Moment>
            </p>
            <Col md="12">
              <Row className="kaznet-action-links">
                <Link
                  to={`/users/edit/${this.props.user.attributes.id}`}
                  className="action-link"
                >
                  EDIT
                </Link>
                {(this.props.user.attributes.submission_count > 0 ||
                  this.props.user.attributes.role !== ADMIN_ROLE) && (
                  <Button
                    color="link"
                    className="remove_button_css action-link action-link-alert"
                    onClick={this.toggle}
                  >
                    &nbsp;&nbsp;|&nbsp;&nbsp; DELETE USER
                  </Button>
                )}
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle}>
                    Are you sure you want to delete this USER?
                  </ModalHeader>
                  <ModalFooter>
                    <Link
                      to={`/users/${this.props.user.id}/delete`}
                      className="btn btn-danger"
                      onClick={this.toggle}
                    >
                      Delete User
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
