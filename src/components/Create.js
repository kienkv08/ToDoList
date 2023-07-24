import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const [id, setId] = useState();
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id,
      title,
      date,
      summary,
      isDone,
    };
    if (title.length === 0 || summary === 0) {
      alert("Please fill all fields");
    } else {
      fetch("http://localhost:9999/to_do_list", {
        method: "POST",
        headers: { "Content-Type": "Application/Json", charset: "utf-8" },
        body: JSON.stringify(product),
      })
        .then(() => {
          alert("Create Successfully!");
          navigate("/homepage");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2 style={{ textAlign: "center" }}>Create Product</h2>
          </Col>
        </Row>
        <Row>
          <Col className="offset-2 col-md-8">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Row style={{ marginBottom: "15px" }}>
                <Form.Group className="col-md-6">
                  <label>ID</label>
                  <Form.Control disabled value={id} />
                </Form.Group>
                <Row></Row>
                <Form.Group className="col-md-6">
                  <label>Name</label>
                  <Form.Control
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  {title.length == 0 && (
                    <label style={{ color: "red" }}>Please enter title</label>
                  )}
                </Form.Group>
                <Row>
                  <Form.Group className="col-md-6">
                    <label>Date</label>
                    <input
                      type="date"
                      style={{ margin: "15px" }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                </Row>
              </Row>
              <Form.Group className="col-md-6">
                <label>Summary</label>
                <Form.Control
                  onChange={(e) => setSummary(e.target.value)}
                  value={summary}
                />
                {summary.length == 0 && (
                  <label style={{ color: "red" }}>Please enter Summary</label>
                )}
              </Form.Group>
              <Row>
                <Form.Group
                  className="col-md-12"
                  style={{ textAlign: "center" }}
                >
                  <Button type="submit">Create</Button>|
                  <Link to={"/"} className="btn btn-danger">
                    Back to List
                  </Link>
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Create;
