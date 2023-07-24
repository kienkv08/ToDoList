import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Modal, Col, Row, Container } from "react-bootstrap";
import { PersonFill, LockFill } from "react-bootstrap-icons";
import "./Login.css";
import bcrypt from "bcryptjs";

const Register = ({ showModal, handleModalClose, loginNow }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [account, setAccount] = useState([]);

  //Call API:
  useEffect(() => {
    fetch("http://localhost:9999/account")
      .then((resp) => resp.json())
      .then((data) => {
        setAccount(data);
      })
      .catch((err) => {});
  }, []);

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username!");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password!");
    }
    if (rePassword === "" || rePassword === null) {
      result = false;
      toast.warning("Please Enter Re-Password!");
    }
    if (rePassword !== password) {
      result = false;
      toast.warning("Re-Password is not same with Password!");
    }
    return result;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newAccount = {
      id: 0,
      username: username,
      password: bcrypt.hashSync(password, 10),
      isAdmin: false,
      isActive: true,
    };
    if (validate()) {
      const findAccount = account.find((acc) => acc.username === username);
      if (findAccount) {
        toast.warning("Username is existed!");
      } else {
        fetch("http://localhost:9999/account", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newAccount),
        })
          .then((resp) => {
            toast.success("Registered successfully!");
          })
          .catch((err) => {
            toast.error("Fail: " + err.message);
          });
        let newUser = {
          id: 0,
          name: "",
          dob: "",
          gender: true,
          city: "",
          email: "",
        };

        fetch("http://localhost:9999/user", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((resp) => {})
          .catch((err) => {
            toast.error("Fail: " + err.message);
          });
        loginNow();
      }
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
                    Register
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="input-box">
                      <span className="icon">
                        <LockFill />
                      </span>
                      <Form.Control
                        type="password"
                        className="no-background"
                        placeholder="Re-Password"
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </Form.Group>
                    <button type="submit" className="btn-login">
                      Register
                    </button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <div className="link-to-register">
                    <p>
                      Already have an account?
                      <a href="#" className="register-link" onClick={loginNow}>
                        &nbsp;Login now
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

export default Register;
