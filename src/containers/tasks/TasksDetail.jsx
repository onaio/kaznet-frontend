import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../LoadListAnimation.css';
import * as taskSelectors from '../../store/tasks/reducer';
import * as userActions from '../../store/users/actions';
import * as taskActions from '../../store/tasks/actions';
import * as globalActions from '../../store/global/actions';
import * as errorHandlerSelectors from '../../store/errorHandler/reducer';
import * as constants from '../../constants';
import ElementMap from '../ElementMap';
import DetailView from '../../components/DetailView';
import TaskDetailTitle from '../../components/tasks/TaskDetailTitle';
import StatisticsSection from './StatisticsSection';
import NestedElementMap from '../NestedElementMap';
import './TasksDetail.scss';

export class TasksDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { fetchTask, noTitle, match } = this.props;
    fetchTask(match.params.id);
    noTitle();
  }

  onFormSubmit(start, end, status) {
    const { match, taskById, exportSubmissions } = this.props;

    const filterObject = {
      task: match.params.id,
      status,
      format: 'csv'
    };
    filterObject[constants.FILTER_TIME_START] = start;
    filterObject[constants.FILTER_TIME_END] = end;
    exportSubmissions(filterObject, taskById.attributes.name);
  }

  toggle() {
    const { modal } = this.state;

    this.setState({
      modal: !modal
    });
  }

  renderLoading() {
    const { hasError, errorMessage } = this.props;

    if (!hasError) {
      return (
        <center>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </center>
      );
    }

    return <p>{errorMessage.message}</p>;
  }

  renderMainDetails() {
    const headerItems = {
      Description: this.task.attributes.description,
      Name: this.task.attributes.name,
      'Unit Reward Amount': this.task.attributes.current_bounty_amount,
      Form: this.task.attributes.xform_title
        ? [
            this.task.attributes.xform_title,
            // eslint-disable-next-line react/jsx-indent
            <a
              href={constants.ONA_LOGIN}
              target="_blank"
              rel="noopener noreferrer"
              key="form_link"
              className="link withspace"
            >
              <FontAwesomeIcon
                icon="external-link-alt"
                className="fa-xs icon-link"
                key="form_link_icon"
              />
              &nbsp;VIEW IN ONA
            </a>
          ]
        : 'Not selected'
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  // eslint-disable-next-line class-methods-use-this
  renderLocations(locations) {
    return (
      <ul key={1} className="list-unstyled">
        <ElementMap items={locations} HTMLTag="li" />
      </ul>
    );
  }

  renderAdditionalDetails() {
    const locations = this.task.attributes.task_locations.map(el => {
      return `${el.location_name}`;
    });

    const headerItems = {
      'Active dates': [
        <Moment format="DD-MM-YYYY" key="start_date">
          {this.task.attributes.start}
        </Moment>,
        ' to ',
        <Moment format="DD-MM-YYYY" key="end_date">
          {this.task.attributes.end}
        </Moment>
      ],
      Locations: this.renderLocations(locations),
      'Submission Limit': this.task.attributes.user_submission_target,
      'Minimum Contributor Level': this.task.attributes.required_expertise_display
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  render() {
    let xformURL;
    let xformTableURL;

    const { taskById } = this.props;
    const { modal } = this.state;
    this.task = taskById;

    if (!this.task) return this.renderLoading();

    const formOwner = this.task.attributes.xform_owner;
    const projectID = this.task.attributes.xform_project_id;
    const onaID = this.task.attributes.xform_ona_id;

    if (formOwner && projectID && onaID) {
      xformURL = `${constants.ONA_WEBSITE}/${formOwner}/${projectID}/${onaID}`;
      xformTableURL = `${xformURL}#/table`;
    } else {
      xformURL = null;
      xformTableURL = xformURL;
    }

    return (
      <div className="TasksList">
        <TaskDetailTitle task={this.task} />
        <StatisticsSection
          accepted={this.task.attributes.approved_submissions_count}
          reward={this.task.attributes.total_bounty_payout}
          review={this.task.attributes.pending_submissions_count}
          rejected={this.task.attributes.rejected_submissions_count}
          totalSubmissions={this.task.attributes.submission_count}
          task={this.task}
          formURL={xformTableURL}
          downloadModalHandler={this.toggle}
          modalState={modal}
          onFormSubmit={this.onFormSubmit}
          taskName={this.task.attributes.name}
          xformTableURL={xformTableURL}
        />
        <DetailView
          renderMainDetails={this.renderMainDetails()}
          renderAdditionalDetails={this.renderAdditionalDetails()}
        />
      </div>
    );
  }
}

TasksDetail.propTypes = {
  exportSubmissions: PropTypes.func.isRequired,
  fetchTask: PropTypes.func.isRequired,
  noTitle: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: {}
  }).isRequired,
  taskById: PropTypes.shape({
    attributes: {}
  }).isRequired,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string
};

TasksDetail.defaultProps = {
  hasError: false,
  errorMessage: ''
};

function mapStateToProps(state, props) {
  return {
    taskById: taskSelectors.getTaskById(state, props.match.params.id),
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTask: taskActions.fetchTask,
      changeTaskStatus: globalActions.changeDetailStatus,
      noTitle: globalActions.toggleTitleOff,
      exportSubmissions: userActions.exportSubmissions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksDetail);
