import {
  React,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./modal/Login";
import Register from "./modal/Register";
import Forgot from "./modal/Forgot";

const Menu = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalForgot, setShowModalForgot] = useState(false);
  const [username, setUserName] = useState(null);
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    setIsRemember(localStorage.getItem("isRemember"));
    if (isRemember) {
      setUserName(localStorage.getItem("username"));
    } else {
      setUserName(sessionStorage.getItem("username"));
    }
  }, [isRemember]);

  const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isRemember");
    sessionStorage.removeItem("username");
  };

  const registerNow = () => {
    setShowModalLogin(false);
    setShowModalRegister(true);
    setShowModalForgot(false);
  };

  const loginNow = () => {
    setShowModalLogin(true);
    setShowModalRegister(false);
    setShowModalForgot(false);
  };

  const forgotNow = () => {
    setShowModalForgot(true);
    setShowModalLogin(false);
    setShowModalRegister(false);
  };

  const handleModalForgotOpen = () => {
    setShowModalForgot(true);
  };

  const handleModalForgotClose = () => {
    setShowModalForgot(false);
  };

  const handleModalLoginOpen = () => {
    setShowModalLogin(true);
  };

  const handleModalLoginClose = () => {
    setShowModalLogin(false);
  };

  const handleModalRegisterOpen = () => {
    setShowModalRegister(true);
  };

  const handleModalRegisterClose = () => {
    setShowModalRegister(false);
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">My List</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about_us">About Us</Nav.Link>
              <Nav.Link href="/contact_support">Contact & Suport</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {username === null ? (
                <>
                  <Nav.Link href="#" onClick={handleModalLoginOpen}>
                    Login
                  </Nav.Link>
                  <Nav.Link href="#" onClick={handleModalRegisterOpen}>
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown title={`Hi, ${username}`} id="nav-dropdown">
                    {/* Dropdown menu items */}
                    <NavDropdown.Item href="/account-profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/setting">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut} href="/">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login
        showModal={showModalLogin}
        handleModalClose={handleModalLoginClose}
        registerNow={registerNow}
        forgotNow={forgotNow}
      />
      <Register
        showModal={showModalRegister}
        handleModalClose={handleModalRegisterClose}
        loginNow={loginNow}
      />
      <Forgot
        showModal={showModalForgot}
        handleModalClose={handleModalForgotClose}
        loginNow={loginNow}
      />
    </>
  );
};

export default Menu;
