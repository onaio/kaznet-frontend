// Renders the page title section
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PageTitle.css';
import {
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  InputGroupText
} from 'reactstrap';

export default class PageTitle extends Component {
  render() {
    const { searchValue, pageTitle, pageTitleButton, pageTarget } = this.props;

    return (
      <section className="page-title">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <div>
              <h1>{pageTitle}</h1>
              <Row>
                <Col md={pageTitleButton && pageTarget ? '9' : '12'}>
                  <Form onSubmit={this.handleSubmit}>
                    <InputGroup className="search-group">
                      <InputGroupAddon addonType="prepend" className="search-prepend">
                        <InputGroupText className="bg-white border-right-0">
                          <Button className="search_button" type="submit" aria-label="Filter">
                            <FontAwesomeIcon icon="search" className="filtersubmit" />
                          </Button>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        bsSize="lg"
                        className="border-left-0"
                        placeholder="Search"
                        aria-label="Search"
                        name="search"
                        onChange={this.handleChange}
                        defaultValue={searchValue}
                      />
                    </InputGroup>
                  </Form>
                </Col>
                {pageTitleButton && pageTarget && (
                  <Col md="3">
                    <Link to={pageTarget} className="btn btn-primary btn-lg">
                      {pageTitleButton}
                    </Link>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}

PageTitle.propTypes = {
  searchValue: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
  pageTarget: PropTypes.string,
  pageTitleButton: PropTypes.string
};

PageTitle.defaultProps = {
  searchValue: '',
  pageTarget: '/',
  pageTitleButton: ''
};
