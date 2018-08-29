// Renders the header
import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
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
} from "reactstrap";

import profile_image from "../../images/profile.png";
import "./Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <header>
        <Container fluid>
          <Navbar light color="white" expand="md">
            <Link to="/" className="navbar-brand logo">
              KAZNET
            </Link>
            <NavbarToggler />
            <Collapse navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink
                    to="/tasks"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Tasks
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/clients"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Clients
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle caret tag="span" className="nav-link">
                      Locations
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink
                          to="/locations"
                          className="nav-link"
                          activeClassName="active"
                        >
                          Locations
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink
                          to="/locationtypes"
                          className="nav-link"
                          activeClassName="active"
                        >
                          Location Types
                        </NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/users"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Users
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <img
                    src={profile_image}
                    className="img-fluid rounded-circle userprofile-img"
                    alt="profile"
                  />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}
