import React from 'react'
import { Container, Navbar, Nav, Row, NavDropdown } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
