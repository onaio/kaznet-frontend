// Renders the detail page title section
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Col, Badge, Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import {
  TASK_ACTIVE,
  TASK_DEACTIVATED,
  TASK_EXPIRED,
  TASK_DRAFT,
  TASK_SCHEDULED,
  TASK_ARCHIVED
} from '../../constants';
import '../page/DetailTitle.scss';

export const getStatusClassName = status => {
  switch (status) {
    case TASK_ACTIVE:
      return 'badge-active';
    case TASK_DEACTIVATED:
      return 'badge-deactivated';
    case TASK_EXPIRED:
      return 'badge-expired';
    case TASK_DRAFT:
      return 'badge-draft';
    case TASK_SCHEDULED:
      return 'badge-scheduled';
    case TASK_ARCHIVED:
      return 'badge-archived';
    default:
      return '';
  }
};

export default class TaskDetailTitle extends Component {
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
    const { modal } = this.state;
    const { task, className } = this.props;
    return (
      <section className="detail-page-title">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div>
            <h1 className="kaznet-detail-title">
              <Link to="/tasks" className="kaznet-header-link">
                Tasks
              </Link>
              &nbsp;&gt;&nbsp;
              {task.attributes.name}
              {task.attributes.status != null ? (
                <Badge className={`kaznet-badge ${getStatusClassName(task.attributes.status)}`}>
                  {task.attributes.status_display}
                </Badge>
              ) : null}
            </h1>
            <p className="kaznet-creation-detail">
              {task.attributes.created_by_name}
              &#44;&nbsp;
              <Moment format="DD-MM-YYYY">{task.attributes.created}</Moment>
            </p>
            <Col md="12">
              <Row className="kaznet-action-links">
                <Link to={`/tasks/${task.id}/edit`} className="action-link">
                  EDIT
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                {task.attributes.status !== TASK_ACTIVE &&
                  task.attributes.xform_title !== '' &&
                  task.attributes.xform_title !== null && (
                    <span>
                      <Link
                        to={`/tasks/${task.id}/status_change/?status=${TASK_ACTIVE}`}
                        className="action-link"
                      >
                        ACTIVATE
                      </Link>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                    </span>
                  )}
                <Link to={`/tasks/${task.id}/clone`} className="action-link">
                  CREATE A COPY
                </Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                {task.attributes.status !== TASK_DEACTIVATED &&
                  task.attributes.xform_title !== '' &&
                  task.attributes.xform_title !== null && (
                    <span>
                      <Link
                        to={`/tasks/${task.id}/status_change/?status=${TASK_DEACTIVATED}`}
                        className="action-link"
                      >
                        DEACTIVATE
                      </Link>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                    </span>
                  )}
                <Button
                  color="link"
                  className="remove_button_css action-link action-link-alert"
                  onClick={this.toggle}
                  aria-label="DELETE TASK"
                >
                  DELETE TASK
                </Button>
                <Modal isOpen={modal} toggle={this.toggle} className={className}>
                  <ModalHeader toggle={this.toggle}>
                    Are you sure you want to delete this task?
                  </ModalHeader>
                  <ModalFooter>
                    <Link
                      to={`/tasks/${task.id}/delete`}
                      className="btn btn-danger"
                      onClick={this.toggle}
                    >
                      Delete Task
                    </Link>
                    <Button color="secondary" onClick={this.toggle} aria-label="Cancel">
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                {task.attributes.status !== TASK_ARCHIVED &&
                  task.attributes.xform_title !== '' &&
                  task.attributes.xform_title !== null && (
                    <Link
                      to={`/tasks/${task.id}/status_change/?status=${TASK_ARCHIVED}`}
                      className="action-link archive-button"
                    >
                      <FontAwesomeIcon icon="folder-open" className="withspace" />
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

TaskDetailTitle.propTypes = {
  className: PropTypes.string.isRequired,
  task: PropTypes.shape({
    attributes: {},
    id: PropTypes.number
  }).isRequired
};
