import React, { Component } from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';

import './FormView.css';

export default class FormView extends Component {
  render() {
    return (
      <section className="form-view">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card className="kaznet-form">
              <CardBody>
                <div>{this.props.form}</div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}
