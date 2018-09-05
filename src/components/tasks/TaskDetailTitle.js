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

import {
  TASK_ACTIVE,
  TASK_DEACTIVATED,
  TASK_EXPIRED,
  TASK_DRAFT,
  TASK_SCHEDULED,
  TASK_ARCHIVED
} from "../../constants";
import "../page/DetailTitle.css";

export default class TaskDetailTitle extends Component {
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
              <Link to="/tasks" className="kaznet-header-link">
                Tasks
              </Link>{" "}
              > {this.props.task.attributes.name}
              {this.props.task.attributes.status != null ? (
                <Badge
                  className={
                    this.props.task.attributes.status === TASK_ACTIVE
                      ? "kaznet-badge badge-active"
                      : this.props.task.attributes.status === TASK_DRAFT
                        ? "kaznet-badge badge-draft"
                        : this.props.task.attributes.status === TASK_DEACTIVATED
                          ? "kaznet-badge badge-deactivated"
                          : this.props.task.attributes.status === TASK_ARCHIVED
                            ? "kaznet-badge badge-archived"
                            : this.props.task.attributes.status === TASK_EXPIRED
                              ? "kaznet-badge badge-expired"
                              : this.props.task.attributes.status ===
                                TASK_SCHEDULED
                                ? "kaznet-badge badge-scheduled"
                                : "kaznet-badge"
                  }
                >
                  {this.props.task.attributes.status_display}
                </Badge>
              ) : null}
            </h1>
            <p className="kaznet-creation-detail">
              {this.props.task.attributes.created_by_name},{" "}
              <Moment format="DD-MM-YYYY">
                {this.props.task.attributes.created}
              </Moment>
            </p>
            <Col md="12">
              <Row className="kaznet-action-links">
                <Link
                  to={`/tasks/${this.props.task.id}/edit`}
                  className="action-link"
                >
                  EDIT
                </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                {this.props.task.attributes.status !== TASK_ACTIVE &&
                  this.props.task.attributes.xform_title !== "" &&
                  this.props.task.attributes.xform_title !== null && (
                    <span>
                      <Link
                        to={`/tasks/${
                          this.props.task.id
                        }/status_change/?status=${TASK_ACTIVE}`}
                        className="action-link"
                      >
                        ACTIVATE
                      </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    </span>
                  )}
                <Link
                  to={`/tasks/${this.props.task.id}/clone`}
                  className="action-link"
                >
                  CREATE A COPY
                </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                {this.props.task.attributes.status !== TASK_DEACTIVATED &&
                  this.props.task.attributes.xform_title !== "" &&
                  this.props.task.attributes.xform_title !== null && (
                    <span>
                      <Link
                        to={`/tasks/${
                          this.props.task.id
                        }/status_change/?status=${TASK_DEACTIVATED}`}
                        className="action-link"
                      >
                        DEACTIVATE
                      </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    </span>
                  )}
                <Button
                  color="link"
                  className="remove_button_css action-link action-link-alert"
                  onClick={this.toggle}
                >
                  DELETE TASK
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle}>
                    Are you sure you want to delete this task?
                  </ModalHeader>
                  <ModalFooter>
                    <Link
                      to={`/tasks/${this.props.task.id}/delete`}
                      className="btn btn-danger"
                      onClick={this.toggle}
                    >
                      Delete Task
                    </Link>
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                {this.props.task.attributes.status !== TASK_ARCHIVED &&
                  this.props.task.attributes.xform_title !== "" &&
                  this.props.task.attributes.xform_title !== null && (
                    <Link
                      to={`/tasks/${
                        this.props.task.id
                      }/status_change/?status=${TASK_ARCHIVED}`}
                      className="action-link archive-button"
                    >
                      <FontAwesomeIcon
                        icon="folder-open"
                        className="withspace"
                      />
                      Archive
                    </Link>
                  )}
              </Row>
            </Col>
          </div>
        </Col>
      </section>
    );
  }
}
