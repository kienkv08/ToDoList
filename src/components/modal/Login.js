import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Modal, Col, Row, Container } from "react-bootstrap";
import { PersonFill, LockFill } from "react-bootstrap-icons";
import "./Login.css";
import bcrypt from "bcryptjs";

const Login = ({ showModal, handleModalClose, registerNow, forgotNow }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState([]);
  const [isRemember, setIsRemember] = useState(false);
  const [isActive, setIsActive] = useState(true);

  //Call API:
  useEffect(() => {
    fetch("http://localhost:9999/account/")
      .then((resp) => resp.json())
      .then((data) => {
        setAccount(data);
        const findAccount = account.find((acc) => acc.username === username);
        if (findAccount) {
          setIsActive(findAccount.isActive);
        } else {
          setIsActive(true);
        }
      })
      .catch((err) => {});
  }, [username]);

  const validate = () => {
    let result = true;
    if (!isActive) {
      result = false;
      toast.warning("Your account has been baned!");
    }
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username!");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password!");
    }
    return result;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const findAccount = account.find(
        (acc) =>
          acc.username === username &&
          bcrypt.compareSync(password, acc.password)
      );
      if (findAccount) {
        if (isRemember) {
          localStorage.setItem("username", username);
        } else {
          sessionStorage.setItem("username", username);
        }
        window.location.reload();
      } else {
        toast.warning("Username or password is not correct!");
      }
    }
  };

  const handleRemember = (event) => {
    if (event.target.checked) {
      localStorage.setItem("isRemember", true);
      setIsRemember(true);
    }
    if (!event.target.checked) {
      setIsRemember(false);
      localStorage.setItem("isRemember", false);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} sm={12}>
            <Modal
              show={showModal}
              onHide={handleModalClose}
              className="my-modal"
              dialogClassName="custom-modal"
            >
              <ToastContainer />
              <div className="wrapper">
                <Modal.Header>
                  <h2
                    className="text-right"
                    style={{ width: "58%", margin: "0" }}
                  >
                    Login
                  </h2>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" className="close-btn">
                      &times;
                    </span>
                  </button>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    className="form-box login"
                    onSubmit={(event) => handleOnSubmit(event)}
                  >
                    <Form.Group className="input-box">
                      <span className="icon">
                        <PersonFill />
                      </span>

                      <Form.Control
                        type="text"
                        className="no-background"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="input-box">
                      <span className="icon">
                        <LockFill />
                      </span>
                      <Form.Control
                        type="password"
                        className="no-background"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <div className="remember-forget">
                      <Row className="justify-content-between">
                        <label className="remember-me">
                          <input
                            type="checkbox"
                            onChange={(e) => handleRemember(e)}
                            checked={isRemember}
                          />
                          &nbsp;Remember Me
                        </label>
                        <a href="#" className="forgot-pass" onClick={forgotNow}>
                          Forgot Password?
                        </a>
                      </Row>
                    </div>
                    <button type="submit" className="btn-login">
                      Login
                    </button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <div className="link-to-register">
                    <p>
                      Don't have an account?
                      <a
                        href="#"
                        className="register-link"
                        onClick={registerNow}
                      >
                        &nbsp;Register
                      </a>
                    </p>
                  </div>
                </Modal.Footer>
              </div>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
