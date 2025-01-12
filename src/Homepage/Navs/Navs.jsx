import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navs/Navs.css"

const Navs = ({ setSelectedPage }) => {
  const [selectedPage, localSetSelectedPage] = useState("Home"); // Track the selected page

  const handleSelect = (page) => {
    localSetSelectedPage(page); // Update the selected page state
    setSelectedPage(page); // Pass selected page up to parent (this would be the App component or the parent component)
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary fixed-navbar" style={{ backgroundColor: "white" }}>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet" />
        <link
                href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap"
                rel="stylesheet"
            />
        <Container fluid>
          <Navbar.Brand href="#" className="navs-title">Whisper</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", width: "100%", justifyContent: "center" }}
              navbarScroll
            >
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "white", color: "black", border: "none", fontWeight: "bold" }}
                  id="dropdown-basic"
                >
                  {selectedPage} {/* Display current page name */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSelect("Home")}>Home</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("Group")}>Group</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Form className="d-flex">
              <Button
                className="notification"
                style={{ backgroundColor: "white", border: "none", color: "black" }}
              >
                <i className="bi bi-bell-fill"></i>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navs;
