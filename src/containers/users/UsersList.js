import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../store/users/actions';
import * as userSelectors from '../../store/users/reducer';
import ListView from '../../components/ListView';
import ElementMap from '../ElementMap';

class UsersList extends Component {

  componentDidMount() {
    this.props.dispatch(userActions.fetchUsers());
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="UsersList">
        <ListView
          renderHeaders={this.renderHeaders}
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

  renderHeaders() {
    const headerItems = [
      'Role',
      'Username',
      'Last Name',
      'First Name',
      'Submissions',
      'Approved %',
      'Last Active Date'
    ];
    return (
      <ElementMap items={headerItems} HTMLTag='th' />
    );
  }

  renderRow(row) {
    const rowItems = [
      row.attributes.role,
      row.attributes.ona_username,
      row.attributes.last_name,
      row.attributes.first_name,
      row.attributes.submission_count,
      row.attributes.avg_approved_submissions * 100 + '%',
      'Last Active Date Here'
    ];

    return (
      <ElementMap items={rowItems} HTMLTag='td' />
    )
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