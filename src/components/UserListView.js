import _ from 'lodash';
import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class ListView extends Component {

  render() {
    return (
      <Table bordered className="kaznet-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Username</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Submissions</th>
            <th>Approved %</th>
            <th>Last Active Date</th>
          </tr>
        </thead>
        <tbody>
          {_.map(this.props.rowsIdArray, this.renderRowById.bind(this))}
        </tbody>
      </Table>
    );
  }

  renderRowById(rowId) {
    return (
      <tr key={rowId}>
        {this.props.renderRow(_.get(this.props.rowsById, rowId))}
      </tr>
    );
  }

}