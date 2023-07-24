import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import "../style/Default.css";
import { PlusCircle, ThreeDots } from "react-bootstrap-icons";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useEffect, useState } from "react";
import { Link, Switch } from "react-router-dom";
import Menu from "./Menu";

const Homepage = () => {
  const [todo, setTodo] = useState([]);
  const [day, setDay] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/day`)
      .then((res) => res.json())
      .then((data) => {
        setDay(data);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete?")) {
      fetch("http://localhost:9999/to_do_list/" + id, {
        method: "DELETE",
      })
        .then(() => {
          window.location.href = "/homepage";
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const changeStatus = (t) => {
    let id = t.id;
    let date = t.date;
    let title = t.title;
    let summary = t.summary;
    let isDone = t.isDone ? false : true;

    const newTodo = { id, title, date, summary, isDone };

    fetch("http://localhost:9999/to_do_list/" + t.id, {
      method: "PUT",
      headers: { "Content-Type": "Application/Json" },
      body: JSON.stringify(newTodo),
    }).then(() => {
      alert("Change success.");
      window.location.reload();
    });
  };

  return (
    <Row>
      <Col>
        <Menu />
        <Container>
          <Row xs={12} className="button">
            <button className="button-create">
              <a href="/day/add" className="create">
                <PlusCircle /> Create New Day
              </a>
            </button>
          </Row>
          <Container>
            <Row>
              <Col>
                {day.map((d) => (
                  <h2 className="day">
                    {d.day}
                    <b className="dot">
                      <ThreeDots />
                    </b>
                  </h2>
                ))}
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Table>
                  <thead>
                    <tr style={{ fontWeight: "bold", textAlign: "bottom" }}>
                      <td>No.</td>
                      <td>Title</td>
                      <td>Date</td>
                      <td>Description</td>
                      <td>Status</td>
                      <th colSpan={2} style={{ textAlign: "center" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todo.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>
                          <Link to={"todo/detail/" + p.id}>{p.title}</Link>
                        </td>
                        <td>{p.date}</td>
                        <td>{p.summary}</td>
                        <td style={{ cursor: "pointer" }}>
                          {p.isDone === true ? (
                            <p
                              onClick={() => changeStatus(p)}
                              style={{ color: "green" }}
                            >
                              Finish
                            </p>
                          ) : (
                            <p
                              onClick={() => changeStatus(p)}
                              style={{ color: "red" }}
                            >
                              Unfinished
                            </p>
                          )}
                        </td>
                        <td>
                          <p
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(p.id)}
                          >
                            Delete
                          </p>
                        </td>
                        <td>
                          {" "}
                          <Link to={"/todo/edit/" + p.id}>Update</Link>
                        </td>
                        <br />
                      </tr>
                    ))}
                    <Link to={"/todo/add"} style={{ fontSize: "5vh" }}>
                      <PlusCircle />
                    </Link>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Container>
      </Col>
    </Row>
  );
};

export default Homepage;
