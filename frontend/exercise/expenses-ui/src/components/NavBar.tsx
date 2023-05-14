import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import {Link, NavLink} from "react-router-dom"
export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" >
        <Container fluid>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center">
              <Nav.Link href="display"> Display </Nav.Link>
              <Nav.Link href="create">Create</Nav.Link>
              <Nav.Link href="update">Update</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
