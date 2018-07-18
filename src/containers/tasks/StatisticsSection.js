import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Col, Row } from "reactstrap";

export default class StatisticsSection extends Component {
  render() {
    return (
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <Row>
          <Col sm="3" className="kaznet-sub">
            <p className="kaznet-stats-count">
              {this.props.totalSubmissions} Submissions
            </p>
          </Col>
          <Col sm="9" className="kaznet-sub">
            {this.props.task && this.props.task.attributes.xform_title ? (
              <a
                href={this.props.formURL}
                className="btn btn-primary text-white"
                target="_blank"
              >
                <FontAwesomeIcon icon="clone" /> Review all submissions
              </a>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <Row>
              <Col sm="6" className="kaznet-no-gutter">
                <div className="kaznet-stats">
                  <p className="stats-data">{this.props.accepted}</p>
                  <p className="stats-header">
                    Accepted
                    <FontAwesomeIcon
                      icon="external-link-alt"
                      className="fa-xs icon-link withspace"
                    />
                  </p>
                </div>
              </Col>
              <Col sm="6" className="kaznet-no-gutter left-fix">
                <div className="kaznet-stats">
                  <p className="stats-data">{this.props.reward}</p>
                  <p className="stats-header">
                    Total Reward
                    <FontAwesomeIcon
                      icon="laptop"
                      className="fa-xs icon-link withspace"
                    />
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm="6" className="overflow-fix">
            <Row>
              <Col sm="6" className="kaznet-stats-col">
                <div className="kaznet-stats">
                  <h1 className="stats-data">{this.props.review}</h1>
                  <p className="stats-header">
                    Needs Review
                    <FontAwesomeIcon
                      icon="external-link-alt"
                      className="fa-xs icon-link withspace"
                    />
                  </p>
                </div>
              </Col>
              <Col sm="6" className="kaznet-stats-col">
                <div className="kaznet-stats overflow-fix">
                  <h1 className="stats-data">{this.props.rejected}</h1>
                  <p className="stats-header">
                    Rejected
                    <FontAwesomeIcon
                      icon="external-link-alt"
                      className="fa-xs icon-link withspace"
                    />
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
      </Col>
    );
  }
}
