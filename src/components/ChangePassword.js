import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import Menu from "./Menu";
import { ToastContainer, toast } from "react-toastify";
import { LockFill } from "react-bootstrap-icons";
import bcrypt from "bcryptjs";

const ChangePassword = () => {
  const [isRemember, setIsRemember] = useState(false);
  const [username, setUserName] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [accounts, setAccount] = useState([]);
  useEffect(() => {
    setIsRemember(localStorage.getItem("isRemember"));
    if (isRemember) {
      setUserName(localStorage.getItem("username"));
    } else {
      setUserName(sessionStorage.getItem("username"));
    }
  }, []);

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
    if (currentPass === "" || currentPass === null) {
      result = false;
      toast.warning("Please Enter Your Current Password!");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const account = accounts.find(
      (acc) =>
        acc.username === username &&
        bcrypt.compareSync(currentPass, acc.password)
    );
    if (validate()) {
      if (account) {
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
        toast.warning("Your current password is not correct!");
      }
    }
  };

  return (
    <Row style={{ backgroundColor: "#659DBD", height: "100vh" }}>
      <Col>
        <Row>
          <Col>
            <Menu />
          </Col>
        </Row>
        <Row style={{ marginTop: "15vh" }}>
          <Container>
            <Row className="justify-content-center">
              <Col xs={6}>
                <Card style={{ padding: "10px", borderRadius: "10px" }}>
                  <Card.Title style={{ textAlign: "center" }}>
                    Hi, {username}
                  </Card.Title>
                  <Card.Body>
                    <Form
                      className="form-box login"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <Form.Group className="input-box">
                        <span className="icon">
                          <LockFill />
                        </span>

                        <Form.Control
                          type="password"
                          className="no-background"
                          placeholder="Current password"
                          value={currentPass}
                          onChange={(e) => setCurrentPass(e.target.value)}
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
                          onChange={(e) => setNewPassword(e.target.value)}
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
                          onChange={(e) => setRePassword(e.target.value)}
                        />
                      </Form.Group>
                      <button type="submit" className="btn-login">
                        Update Profile
                      </button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Row>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default ChangePassword;
