import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    } from 'reactstrap';
import {NavLink,} from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Weather</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </NavItem>
                    
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Header;