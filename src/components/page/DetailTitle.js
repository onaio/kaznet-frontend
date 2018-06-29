// Renders the detail page title section
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

export default class DetailPageTitle extends Component {
  render() {
    return (
      <section className="detail-page-title">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div>
            <h1 className="kaznet-detail-title">
              <Link to={this.props.pageTarget} className="kaznet-header-link">
                {this.props.pageTitle}
              </Link>{" "}
              > {this.props.detailName}
              <Badge className="kaznet-badge">Active</Badge>
            </h1>
            <p className="kaznet-creation-detail">
              By Jensen Nathan, 21 May 2018
            </p>
            <Col md="12">
              <Row className="kaznet-action-links">
                {/* Method maybe? to auto generate this links */}
                <Link to="/" className="action-link">
                  EDIT
                </Link>
                <Link to="/" className="action-link">
                  CREATE A COPY
                </Link>
                <Link to="/" className="action-link">
                  DEACTIVATE
                </Link>
                <Link to="/" className="action-link">
                  DELETE
                </Link>
              </Row>
            </Col>
          </div>
        </Col>
      </section>
    );
  }
}
