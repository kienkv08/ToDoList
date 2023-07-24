import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FetureInforLeft = ({ img, text, title }) => {
  return (
    <div>
      <Row>
        <Container fluid>
          <Row>
            <Col xs={12} sm={7}>
              <img style={{ width: "100%", height: "auto" }} src={img} />
            </Col>
            <Col xs={12} sm={5}>
              <h1>{title}</h1>
              {text}
            </Col>
          </Row>
        </Container>
      </Row>
    </div>
  );
};

export default FetureInforLeft;
