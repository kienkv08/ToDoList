import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import "../style/Detail.css";
import { PlusCircle, PlusSquareFill } from "react-bootstrap-icons/dist";

const Detail = () => {
  const { id } = useParams();
  const [todoDetail, setTodoDetail] = useState([]);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  useEffect(() => {
    fetch(`http://localhost:9999/to_do_list_detail?toDoListId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTodoDetail(data);
      });
  }, [id]);

  const handleCreate = () => {
    // Perform the create operation by making a POST request to the backend
    fetch("http://localhost:9999/to_do_list_detail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toDoListId: id,
        name: "New Detail",
        timeAt: "09:00",
        timeTo: "10:00",
        description: "New detail description",
        isDone: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoDetail([...todoDetail, data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (detailId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:9999/to_do_list_detail/${detailId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            const updatedTodoDetail = todoDetail.filter(
              (detail) => detail.id !== detailId
            );
            setTodoDetail(updatedTodoDetail);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2 className="text-center mt-4">Todo Detail</h2>
      <Row className="justify-content-center">
        {todoDetail.map((detail, index) => (
          <Col key={detail.id} xs={12} sm={6} md={4} xl={3}>
            <Card
              className="mb-4 detail-card"
              style={{
                backgroundColor: colors[index % 5].secondaryColor,
                borderColor: colors[index % 5].primaryColor,
              }}
            >
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">{detail.name}</Card.Title>
                <Card.Text className="card-text">
                  Time: {detail.timeAt} - {detail.timeTo}
                </Card.Text>
                <Card.Text className="card-text">
                  Description: {detail.description}
                </Card.Text>
                <Card.Text className="card-text">
                  Status: {detail.isDone ? "Done" : "Not done"}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-end">
                  <Link
                    to={`/todo/detail/update/${detail.id}`}
                    variant="primary"
                    className=""
                  >
                    <PencilSquare />
                  </Link>
                  <a
                    style={{ color: "red" }}
                    variant="danger"
                    onClick={() => handleDelete(detail.id)}
                    className=""
                  >
                    <Trash />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div
        className="text-center mt-4"
        style={{ marginRight: "10vh", fontSize: "5vh" }}
      >
        <a variant="success" onClick={handleCreate}>
          <PlusCircle />
        </a>
      </div>
    </div>
  );
};

export default Detail;
