// This component renders a list using Bootstrap 4 tables
import _ from 'lodash';
import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class ListView extends Component {

  render() {
    return (
      <Table bordered className="kaznet-table">
        <thead>
          <tr>
            {this.props.renderHeaders()}
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