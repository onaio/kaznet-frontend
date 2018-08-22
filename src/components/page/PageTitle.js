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
  InputGroupText,
  Button,
  FormGroup
} from "reactstrap";

export default class PageTitle extends Component {
  // handleChange(event) {
  //   this.setState({search: event.target.value});
  //   console.log(this.props.title);
  // }

  render() {
    return (
      <section className="page-title">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <div>
              <h1>{this.props.pageTitle}</h1>
              <Row>
                <Col md="8">
                  <Form inline>
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
                        name="search"
                      />
                    </InputGroup>
                    <FormGroup>
                      &nbsp;
                      <Button type="submit" className="btn btn-primary btn-lg">
                        <FontAwesomeIcon icon="search" />&nbsp; Search
                      </Button>
                    </FormGroup>
                  </Form>
                </Col>
                <Col md="4">
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
