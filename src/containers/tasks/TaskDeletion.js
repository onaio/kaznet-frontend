import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import * as taskActions from "../../store/tasks/actions";
import * as errorHandlerSelectors from "../../store/errorHandler/reducer";

export class TaskDeletion extends Component {
  componentDidMount() {
    this.props.deleteTask(this.props.match.params.id);
  }

  render() {
    return <Redirect to="/tasks" />;
  }
}
function mapStateToProps(state, props) {
  return {
    hasError: errorHandlerSelectors.getHasError(state),
    errorMessage: errorHandlerSelectors.getErrorMessage(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteTask: taskActions.deleteTask
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDeletion);
