import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../LoadListAnimation.css";
import * as taskSelectors from "../../store/tasks/reducer";
import * as userActions from "../../store/users/actions";
import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";
import * as constants from "../../constants";
import ElementMap from "../ElementMap";
import DetailView from "../../components/DetailView";
import TaskDetailTitle from "../../components/tasks/TaskDetailTitle";
import StatisticsSection from "./StatisticsSection";
import NestedElementMap from "../NestedElementMap";
import "./TasksDetail.css";

export class TasksDetail extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
    this.props.noTitle();
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      start: undefined,
      end: undefined
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onFormSubmit(start, end) {
    let filter_object = {
      task: this.props.match.params.id,
      status: constants.SUBMISSION_APPROVED,
      format: "csv"
    };
    filter_object[constants.FILTER_TIME_START] = start;
    filter_object[constants.FILTER_TIME_END] = end;
    this.props.exportSubmissions(
      filter_object,
      this.props.taskById.attributes.name
    );
  }

  render() {
    let xformURL;
    let xformTableURL;
    this.task = this.props.taskById;
    if (!this.task) return this.renderLoading();
    const form_owner = this.task.attributes.xform_owner;
    const form_projectid = this.task.attributes.xform_project_id;
    const ona_id = this.task.attributes.xform_ona_id;
    if (form_owner && form_projectid && ona_id) {
      xformURL = `${constants.ONA_WEBSITE}/${
        this.task.attributes.xform_owner
      }/${this.task.attributes.xform_project_id}/${
        this.task.attributes.xform_ona_id
      }`;
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
          modalState={this.state.modal}
          onFormSubmit={this.onFormSubmit}
          taskName={this.task.attributes.name}
          xformTableURL={xformTableURL}
        />
        <DetailView
          renderMainDetails={this.renderMainDetails(xformURL)}
          renderAdditionalDetails={this.renderAdditionalDetails()}
        />
      </div>
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return (
        <center>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </center>
      );
    } else if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }

  renderMainDetails(xformURL) {
    const headerItems = {
      Description: this.task.attributes.description,
      Name: this.task.attributes.name,
      "Unit Reward Amount": this.task.attributes.current_bounty_amount,
      Form: this.task.attributes.xform_title
        ? [
            this.task.attributes.xform_title,
            <a
              href={constants.ONA_LOGIN}
              target="_blank"
              key="form_link"
              className="link withspace"
            >
              <FontAwesomeIcon
                icon="external-link-alt"
                className="fa-xs icon-link"
                key="form_link_icon"
              />{" "}
              VIEW IN ONA
            </a>
          ]
        : "Not selected"
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  renderLocations(locations) {
    return (
      <ul key={1} className="list-unstyled">
        <ElementMap items={locations} HTMLTag="li" />
      </ul>
    );
  }

  renderAdditionalDetails() {
    const locations = this.task.attributes.task_locations.map(function(el) {
      return `${el.location_name}`;
    });

    const headerItems = {
      "Active dates": [
        <Moment format="DD-MM-YYYY" key="start_date">
          {this.task.attributes.start}
        </Moment>,
        " to ",
        <Moment format="DD-MM-YYYY" key="end_date">
          {this.task.attributes.end}
        </Moment>
      ],
      Locations: this.renderLocations(locations),
      "Submission Limit": this.task.attributes.user_submission_target,
      "Minimum Contributor Level": this.task.attributes
        .required_expertise_display
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksDetail);
