// Renders the detail page title section
import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import "../page/DetailTitle.css";

export default class UserDetailTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <section className="detail-page-title">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div>
            <h1 className="kaznet-detail-title">
              <Link to="/users" className="kaznet-header-link">
                Users
              </Link>{" "}
              > {this.props.user.attributes.ona_username}
            </h1>&nbsp;&nbsp;
            <Col md="12">
              <Row className="kaznet-action-links">
                <Link
                  to={`/users/${this.props.user.id}/edit`}
                  className="action-link"
                >
                  EDIT
                </Link>
              </Row>
            </Col>
          </div>
        </Col>
      </section>
    );
  }
}
