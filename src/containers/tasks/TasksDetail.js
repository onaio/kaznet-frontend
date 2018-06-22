import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./TasksDetail.css";
import _ from "lodash";

import * as taskSelectors from "../../store/tasks/reducer";
import * as taskActions from "../../store/tasks/actions";
import * as globalActions from "../../store/global/actions";

import DetailView from "../../components/TasksDetailView";
import ElementMap from "../ElementMap";

export class TasksDetail extends Component {
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id);
    this.props.changePageTitle("Tasks >");
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="TasksList">
        <DetailView />
      </div>
    );
  }

  renderLoading() {
    return <p>Loading...</p>;
  }
}

function mapStateToProps(state) {
  return {
    rowsById: taskSelectors.getTasksById(state)
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
