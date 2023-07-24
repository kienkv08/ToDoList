import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <Row
      className="header-app fixed-bottom"
      style={{ backgroundColor: "black", padding: "10px" }}
    >
      <Container className="footer-content">
        <Row>
          <Col xs={12} style={{ textAlign: "center", color: "white" }}>
            @Copyright Group 4
          </Col>
        </Row>
      </Container>
    </Row>
  );
}

export default Footer;
