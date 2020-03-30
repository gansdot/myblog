import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
export const layoutContainer = {
  width: "80%",
  paddingRight: "8%",
  paddingLeft: "8%",
  marginRight: "auto",
  marginLeft: "auto"
};
const Navigation = () => {
  const style = {
    paddingLeft: 100
  };
  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container style={style} style={layoutContainer}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link href="/">
                <Navbar.Brand href="home">
                  <img src="/logo.jpeg" width="75px" height="35px" alt="logo" />
                </Navbar.Brand>
              </Link>

              <Link href="/post/[id]" as="/post/1">
                <a className="nav-link">Posts</a>
              </Link>

              <NavDropdown title="Learn" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">DevOps</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">ReactJs</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">NextJs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  SpringBoot
                </NavDropdown.Item>
              </NavDropdown>

              <Link href="/admin">
                <a className="nav-link">Admin</a>
              </Link>
              <Link href="/about">
                <a className="nav-link">About</a>
              </Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-3"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
