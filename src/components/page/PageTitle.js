// Renders the page title section
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText
} from "reactstrap";

export default class PageTitle extends Component {
  render() {
    return (
      <section className="page-title">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <div>
              <h1>{this.props.pageTitle}</h1>
              <Row>
                <Col md="9">
                  <Form>
                    <InputGroup className="search-group">
                      <InputGroupAddon
                        addonType="prepend"
                        className="search-prepend"
                      >
                        <InputGroupText className="bg-white border-right-0">
                          <FontAwesomeIcon icon="search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        bsSize="lg"
                        className="border-left-0"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </InputGroup>
                  </Form>
                </Col>
                <Col md="3">
                  <Link
                    to={this.props.pageTarget || "/"}
                    className="btn btn-primary btn-lg"
                  >
                    {this.props.pageTitleButton}
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}
