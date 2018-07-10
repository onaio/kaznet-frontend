import React, { Component } from "react";
import { Col, Row } from "reactstrap";

import "./FormView.css";

export default class FormView extends Component {
  render() {
    return (
      <section className="form-view">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <div>{this.props.form}</div>
          </Col>
        </Row>
      </section>
    );
  }
}
