// Renders the detail page title section
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../page/DetailTitle.scss';

export default class UserDetailTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  }

  render() {
    const { user } = this.props;

    return (
      <section className="detail-page-title">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div>
            <h1 className="kaznet-detail-title">
              <Link to="/users" className="kaznet-header-link">
                Users
              </Link>
              &nbsp;&gt;&nbsp;
              {user.attributes.ona_username}
            </h1>
            &nbsp;&nbsp;
            <Col md="12">
              <Row className="kaznet-action-links">
                <Link to={`/users/${user.id}/edit`} className="action-link">
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

UserDetailTitle.propTypes = {
  user: PropTypes.shape({
    attributes: {},
    id: PropTypes.number
  }).isRequired
};
