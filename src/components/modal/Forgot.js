import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Modal, Col, Row, Container } from "react-bootstrap";
import { EnvelopeCheckFill, LockFill, PersonFill } from "react-bootstrap-icons";
import "./Login.css";
import bcrypt from "bcryptjs";

const Forgot = ({ showModal, handleModalClose, loginNow }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [accounts, setAccount] = useState([]);
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState("");

  //Call API:
  useEffect(() => {
    fetch("http://localhost:9999/account/")
      .then((resp) => resp.json())
      .then((data) => {
        setAccount(data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {});
  }, []);

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username!");
    }
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter Your Email !");
    }
    if (newPassword === "" || newPassword === null) {
      result = false;
      toast.warning("Please Enter New Password!");
    }
    if (rePassword === "" || rePassword === null) {
      result = false;
      toast.warning("Please Enter Re-Password!");
    }
    if (rePassword !== newPassword) {
      result = false;
      toast.warning("Re-Password is not same with Password!");
    }
    return result;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const account = accounts.find((acc) => acc.username === username);
      if (account) {
        const user = users.find(
          (us) => us.email === email && us.id == account.id
        );
        if (user) {
          const newAccount = {
            id: account.id,
            username: username,
            password: bcrypt.hashSync(newPassword, 10),
            isAdmin: account.isAdmin,
            isActive: account.isActive,
          };
          fetch("http://localhost:9999/account/" + account.id, {
            method: "PUT",
            headers: { "Content-Type": "Application/Json", charset: "utf-8" },
            body: JSON.stringify(newAccount),
          })
            .then(() => {
              toast.success("Change password successfully!");
              window.location.reload();
            })
            .catch((err) => {
              toast.error("Fail: " + err.message);
            });
        } else {
          toast.warning("Email is not correct!");
        }
      } else {
        toast.warning("Your username is not existed!");
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
                    Forgot Password
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
                        <EnvelopeCheckFill />
                      </span>

                      <Form.Control
                        type="email"
                        className="no-background"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="input-box">
                      <span className="icon">
                        <LockFill />
                      </span>
                      <Form.Control
                        type="password"
                        className="no-background"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="input-box">
                      <span className="icon">
                        <LockFill />
                      </span>
                      <Form.Control
                        type="password"
                        className="no-background"
                        placeholder="New Re-Password"
                        value={rePassword}
                        onChange={(e) => {
                          setRePassword(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <button type="submit" className="btn-login">
                      Change password
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

export default Forgot;
