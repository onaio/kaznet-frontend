// Renders the header
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
  } from 'reactstrap';

import profile_image from '../../images/profile.png';

export default class Header extends Component {
    render() {
      return(
        <header>
        <Container fluid>
          <Navbar dark color="dark" expand="md">
            <NavbarBrand href="/">[Kaznet Logo]</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink to="/tasks" className="nav-link" activeClassName="active">Tasks</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" className="nav-link" activeClassName="active">Clients</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" className="nav-link" activeClassName="active">Locations</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#" className="nav-link" activeClassName="active">Users</NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <img src={profile_image} className="img-fluid rounded-circle userprofile-img" alt="profile" />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
      );
    }
}