import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TasksList.css';
import * as taskActions from '../../store/tasks/actions';
import * as taskSelectors from '../../store/tasks/reducer';
import ListView from '../../components/ListView';

class TasksList extends Component {

  componentDidMount() {
    this.props.dispatch(taskActions.fetchTasks());
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="TasksList">
        <ListView
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow} />
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(row) {
    return (
      <div>
        <h3>{row.attributes.name}</h3>
        <p>{row.attributes.description}</p>
      </div>
    )
  }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: taskSelectors.getTasksById(state),
    rowsIdArray: taskSelectors.getTasksIdArray(state)
  };
}

export default connect(mapStateToProps)(TasksList);