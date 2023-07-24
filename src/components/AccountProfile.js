import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import Menu from "./Menu";
import { ToastContainer, toast } from "react-toastify";
import {
  PersonFill,
  BalloonFill,
  MapFill,
  PersonFillUp,
  EnvelopeAtFill,
} from "react-bootstrap-icons";

const AccountProfile = () => {
  const [isRemember, setIsRemember] = useState(false);
  const [id, setId] = useState(0);
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    setIsRemember(localStorage.getItem("isRemember"));
    if (isRemember) {
      setUserName(localStorage.getItem("username"));
    } else {
      setUserName(sessionStorage.getItem("username"));
    }
  }, [username]);

  //Call API:
  useEffect(() => {
    fetch("http://localhost:9999/account")
      .then((resp) => resp.json())
      .then((data) => {
        let dataFilter = data.filter((d) => d.username === username);
        fetch("http://localhost:9999/user/" + dataFilter[0].id)
          .then((resp) => resp.json())
          .then((data) => {
            setId(data.id);
            setName(data.name);
            setDob(data.dob);
            setGender(data.gender);
            setCity(data.city);
            setEmail(data.email);
          });
      })
      .catch((err) => {});
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("id:", id);
    let newUser = {
      id: id,
      name: name,
      dob: dob,
      gender: gender,
      city: city,
      email: email,
    };
    fetch("http://localhost:9999/user/" + id, {
      method: "PUT",
      headers: { "Content-Type": "Application/Json", charset: "utf-8" },
      body: JSON.stringify(newUser),
    })
      .then(() => {
        toast.success("Update profile successfully!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Fail: " + err.message);
      });
  };

  return (
    <Row style={{ backgroundColor: "#659DBD", height: "100vh" }}>
      <Col>
        <Row>
          <Col>
            <Menu />
          </Col>
        </Row>
        <Row style={{ marginTop: "10vh" }}>
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
                          <PersonFill />
                        </span>

                        <Form.Control
                          type="text"
                          className="no-background"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="input-box">
                        <span className="icon">
                          <BalloonFill />
                        </span>
                        <Form.Control
                          type="text"
                          className="no-background"
                          placeholder="Date of birth"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="input-box">
                        <span className="icon">
                          <PersonFillUp />
                        </span>
                        <Form.Select
                          type="text"
                          className="no-background"
                          placeholder="Gender"
                          onChange={(e) => setGender(e.target.value)}
                          style={{ border: "none", outline: "none" }}
                          value={gender}
                        >
                          <option value={true}>Male</option>
                          <option value={false}>Female</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="input-box">
                        <span className="icon">
                          <MapFill />
                        </span>
                        <Form.Control
                          type="text"
                          className="no-background"
                          placeholder="Address"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="input-box">
                        <span className="icon">
                          <EnvelopeAtFill />
                        </span>
                        <Form.Control
                          type="Email"
                          className="no-background"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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

export default AccountProfile;
