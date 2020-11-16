import React from 'react';
import { Film } from 'react-bootstrap-icons';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

const NavBar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <Film />
      <span> MyMovies </span>
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#action">Action</Nav.Link>
      <Nav.Link href="#aventure">Aventure</Nav.Link>
      <Nav.Link href="#horruer">Horreur</Nav.Link>
      <Nav.Link href="#comedie">Comédie</Nav.Link>
      <Nav.Link href="#signin">Sign-In</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
);

export default NavBar;
