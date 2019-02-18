import React, { Component } from 'react';
import { Table, Col } from 'reactstrap';

export default class DetailView extends Component {
  render() {
    return (
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <Table borderless className="kaznet-table details">
          <tbody>
            {this.props.renderMainDetails}
            <tr>
              <td className="kaznet-title-h1">Details</td>
            </tr>
            {this.props.renderAdditionalDetails}
          </tbody>
        </Table>
      </Col>
    );
  }
}
