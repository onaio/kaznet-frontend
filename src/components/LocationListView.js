import _ from 'lodash';
import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class ListView extends Component {

  render() {
    return (
      <Table bordered className="kaznet-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th>Type</th>
            <th>Description</th>
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