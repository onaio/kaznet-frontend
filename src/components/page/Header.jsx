// Renders the header
import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';

import * as userSelectors from '../../store/users/reducer';
import * as userActions from '../../store/users/actions';

import profileImage from '../../images/profile.png';
import * as constants from '../../constants';
import './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleLocation = this.toggleLocation.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
    this.getAppName = this.getAppName.bind(this);
    this.state = {
      locationDropDownOpen: false,
      taskDropDownOpen: false,
      userDropDownOpen: false
    };
  }

  componentDidMount() {
    const { fetchLoggedInUser } = this.props;
    fetchLoggedInUser();
  }

  // eslint-disable-next-line class-methods-use-this
  getAppName() {
    if (constants.WEBSITE_NAME) return constants.WEBSITE_NAME.toUpperCase();
    return 'CERANA';
  }

  toggleLocation() {
    this.setState(prevState => ({
      locationDropDownOpen: !prevState.locationDropDownOpen
    }));
  }

  toggleTask() {
    this.setState(prevState => ({
      taskDropDownOpen: !prevState.taskDropDownOpen
    }));
  }

  toggleUser() {
    this.setState(prevState => ({
      userDropDownOpen: !prevState.userDropDownOpen
    }));
  }

  render() {
    const { location, getCurrentUser } = this.props;
    const path = location.pathname;

    const { taskDropDownOpen, locationDropDownOpen, userDropDownOpen } = this.state;

    return (
      <header>
        <Container fluid>
          <Navbar light color="white" expand="md">
            <Link to="/" className="navbar-brand logo">
              {this.getAppName()}
            </Link>
            <NavbarToggler />
            <Collapse navbar>
              <Nav navbar>
                <NavItem>
                  <Dropdown isOpen={taskDropDownOpen} toggle={this.toggleTask}>
                    <DropdownToggle
                      caret
                      tag="span"
                      className={
                        path === '/tasks' || path === '/forms' ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Tasks
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink to="/tasks" className="nav-link" activeClassName="active">
                          Tasks
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink to="/forms" className="nav-link" activeClassName="active">
                          Forms
                        </NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
                <NavItem>
                  <NavLink to="/clients" className="nav-link" activeClassName="active">
                    Clients
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Dropdown isOpen={locationDropDownOpen} toggle={this.toggleLocation}>
                    <DropdownToggle
                      caret
                      tag="span"
                      className={
                        path === '/locations' || path === '/locationtypes'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      Locations
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink to="/locations" className="nav-link" activeClassName="active">
                          Locations
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink to="/locationtypes" className="nav-link" activeClassName="active">
                          Location Types
                        </NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
                <NavItem>
                  <NavLink to="/users" className="nav-link" activeClassName="active">
                    Users
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Dropdown isOpen={userDropDownOpen} toggle={this.toggleUser} size="sm">
                    <DropdownToggle tag="span" className="toggle-user">
                      <img
                        src={
                          getCurrentUser &&
                          getCurrentUser.attributes &&
                          getCurrentUser.attributes.metadata.gravatar
                            ? getCurrentUser.attributes.metadata.gravatar
                            : profileImage
                        }
                        className="img-fluid rounded-circle userprofile-img"
                        alt="profile"
                      />
                    </DropdownToggle>
                    {getCurrentUser && getCurrentUser.id && (
                      <DropdownMenu right>
                        <DropdownItem>
                          <NavLink
                            to={`/users/${getCurrentUser.id}`}
                            className="nav-link"
                            activeClassName="active"
                          >
                            View Profile
                          </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <a href="/accounts/logout" className="nav-link">
                            Log Out
                          </a>
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </Dropdown>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    getCurrentUser: userSelectors.getCurrentUser(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLoggedInUser: userActions.fetchLoggedInUser
    },
    dispatch
  );
}

Header.propTypes = {
  fetchLoggedInUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  getCurrentUser: PropTypes.shape({
    id: PropTypes.number,
    attributes: PropTypes.shape({
      metadata: PropTypes.shape({
        gravatar: PropTypes.string
      })
    })
  }).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
