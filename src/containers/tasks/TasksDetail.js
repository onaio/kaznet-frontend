import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import _ from "lodash";
import "./TasksDetail.css";
import { rrulestr } from "rrule";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import * as taskSelectors from "../../store/tasks/reducer";
import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";

import DetailView from "../../components/DetailView";
import StatisticsSection from "./StatisticsSection";
import NestedElementMap from "../NestedElementMap";

export class TasksDetail extends Component {
  constructor(props) {
    super(props);
    this.title = "Undefined";
  }

  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
    this.props.changePageTitle(`Tasks > Undefined`);
  }

  componentDidUpdate() {
    this.props.changePageTitle(`Tasks > ${this.title}`);
  }

  render() {
    const task = _.find(this.props.rowById, data => {
      return data.id === this.props.match.params.id;
    });
    if (!task) return this.renderLoading();
    this.title = task.attributes.name;
    return (
      <div className="TasksList">
        <StatisticsSection
          accepted={task.attributes.approved_submissions_count}
          reward={task.attributes.total_bounty_payout}
          review={task.attributes.pending_submissions_count}
          rejected={task.attributes.rejected_submissions_count}
          totalSubmissions={task.attributes.submission_count}
        />
        <DetailView
          renderMainDetails={this.renderMainDetails(task)}
          renderAdditionalDetails={this.renderAdditionalDetails(task)}
        />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderMainDetails(data) {
    const headerItems = {
      Description: data.attributes.description,
      Name: data.attributes.name,
      "Unit Reward Amount": data.attributes.current_bounty_amount,
      Form:
        data.attributes.xform_title !== ""
          ? [
              data.attributes.xform_title,
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

  renderAdditionalDetails(data) {
    const timingRule =
      data.attributes.timing_rule != null
        ? rrulestr(data.attributes.timing_rule).toText()
        : "";

    const headerItems = {
      "Active dates": [
        <Moment format="DD-MM-YYYY" key="start_date">
          {data.attributes.start}
        </Moment>,
        " to ",
        <Moment format="DD-MM-YYYY" key="end_date">
          {data.attributes.end}
        </Moment>
      ],
      Location: "Location Here",
      Recurring: timingRule,
      "Submission Limit": data.attributes.user_submission_target,
      "Minimum Contributor Level": data.attributes.required_expertise_display
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }
}

function mapStateToProps(state) {
  return {
    rowById: taskSelectors.getTasksById(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTask: taskActions.fetchTask,
      changePageTitle: globalActions.changePageTitle
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksDetail);
