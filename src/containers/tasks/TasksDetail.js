import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "./TasksDetail.css";

import * as taskSelectors from "../../store/tasks/reducer";
import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";

import DetailView from "../../components/DetailView";
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
      Form: data.attributes.xform_title
    };

    return <NestedElementMap detailitems={headerItems} HTMLTag="td" />;
  }

  renderAdditionalDetails(data) {
    const headerItems = {
      "Active dates": "Active Date Here",
      Recurring: "Timing Rule Here",
      Locations: "Location Here",
      "Submission Limit": data.attributes.total_submission_target,
      "Minimum Contributor Level": "Minimum Contributor Level here"
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
