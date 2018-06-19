import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UsersList.css';
import * as userActions from '../../store/users/actions';
import * as userSelectors from '../../store/users/reducer';
import ListView from '../../components/UserListView';

class UsersList extends Component {

  componentDidMount() {
    this.props.dispatch(userActions.fetchUsers());
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="UsersList">
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
      [
        <td>{row.attributes.role}</td>,
        <td>{row.attributes.ona_username}</td>,
        <td>{row.attributes.last_name}</td>,
        <td>{row.attributes.first_name}</td>,
        <td>{row.attributes.submission_count}</td>,
        <td>{row.attributes.avg_approved_submissions * 100}%</td>,
        <td>Last Active Date Here</td>
      ]
    );
  }

}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    rowsById: userSelectors.getUsersById(state),
    rowsIdArray: userSelectors.getUsersIdArray(state)
  };
}

export default connect(mapStateToProps)(UsersList);