import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import { rrulestr } from "rrule";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import * as taskSelectors from "../../store/tasks/reducer";
import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";

import DetailView from "../../components/DetailView";
import StatisticsSection from "./StatisticsSection";
import NestedElementMap from "../NestedElementMap";
import LinkMap from "../LinkMap";
import "./TasksDetail.css";

export class TasksDetail extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
    this.props.changePageTitle(`Tasks`);
    this.props.changePageTarget("/tasks");
    if (this.task) {
      this.props.showDetailTitle(this.task.attributes.name);
      this.props.changeTaskStatus(this.task.attributes.status_display);
      this.props.setActionLinks(this.renderActionLinks());
    } else {
      this.props.showDetailTitle();
      this.props.changeTaskStatus();
    }
    this.props.setActionLinks(this.renderActionLinks());
  }

  componentDidUpdate() {
    if (this.task) {
      this.props.showDetailTitle(this.task.attributes.name);
      this.props.changeTaskStatus(this.task.attributes.status_display);
      this.props.setActionLinks(this.renderActionLinks());
    }
  }

  render() {
    this.task = this.props.taskById;
    if (!this.task) return this.renderLoading();
    return (
      <div className="TasksList">
        <StatisticsSection
          accepted={this.task.attributes.approved_submissions_count}
          reward={this.task.attributes.total_bounty_payout}
          review={this.task.attributes.pending_submissions_count}
          rejected={this.task.attributes.rejected_submissions_count}
          totalSubmissions={this.task.attributes.submission_count}
        />
        <DetailView
          renderMainDetails={this.renderMainDetails()}
          renderAdditionalDetails={this.renderAdditionalDetails()}
        />
      </div>
    );
  }

  renderLoading() {
    if (!this.props.hasError) {
      return <p>Loading...</p>;
    } else if (this.props.hasError) {
      return <p> {this.props.errorMessage.message} </p>;
    }
  }

  renderMainDetails() {
    const headerItems = {
      Description: this.task.attributes.description,
      Name: this.task.attributes.name,
      "Unit Reward Amount": this.task.attributes.current_bounty_amount,
      Form:
        this.task.attributes.xform_title !== ""
          ? [
              this.task.attributes.xform_title,
              <a href="/" key="form_link" className="link withspace">
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

  renderAdditionalDetails() {
    const timingRule =
      this.task.attributes.timing_rule != null &&
      this.task.attributes.timing_rule !== ""
        ? rrulestr(this.task.attributes.timing_rule).toText()
        : "";

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
      Location: "Location Here",
      Recurring: timingRule,
      "Submission Limit": this.task.attributes.user_submission_target,
      "Minimum Contributor Level": this.task.attributes
        .required_expertise_display
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  renderActionLinks() {
    var actionLinks = {};

    if (this.task) {
      if (this.task.attributes.status_display === "Active") {
        actionLinks = {
          EDIT: `/tasks/${this.task.id}/edit`,
          "CREATE A COPY": "/",
          DEACTIVATE: `/tasks/${this.task.id}/status_change`,
          "DELETE TASK": "/"
        };
      } else {
        actionLinks = {
          EDIT: `/tasks/${this.task.id}/edit`,
          "CREATE A COPY": "/",
          ACTIVATE: `/tasks/${this.task.id}/status_change`,
          "DELETE TASK": "/"
        };
      }
    }

    return <LinkMap links={actionLinks} />;
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
      changePageTitle: globalActions.changePageTitle,
      showDetailTitle: globalActions.toggleDetailTitleOn,
      changePageTarget: globalActions.changePageTarget,
      setActionLinks: globalActions.setPageActionLinks,
      changeTaskStatus: globalActions.changeDetailStatus
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksDetail);
