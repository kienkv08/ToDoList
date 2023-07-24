import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";

const ListAcc = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/account")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleIsActive = (userId) => {
    const userToUpdate = users.find((user) => user.id === userId);
    if (!userToUpdate) return;

    const updatedUser = { ...userToUpdate, isActive: !userToUpdate.isActive };

    fetch("http://localhost:9999/account/" + userId, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return updatedUser;
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleIsAdmin = (userId) => {
    const userToUpdate = users.find((user) => user.id === userId);
    if (!userToUpdate) return;

    const updatedUser = { ...userToUpdate, isAdmin: !userToUpdate.isAdmin };

    fetch("http://localhost:9999/account/" + userId, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return updatedUser;
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <h2 className="text-center mt-4">Management of Accounts</h2>
            </Col>
          </Row>
          <Row>
            <Col className="offset-3 mt-4" md={6}>
              <Card>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>IsAdmin</th>
                      <th>IsActive</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.password ? "******" : ""}</td>
                        <td>{user.isAdmin ? "Admin" : "User"}</td>
                        <td>
                          <Button
                            className={
                              user.isActive
                                ? "btn btn-success"
                                : "btn btn-danger"
                            }
                            onClick={() => toggleIsActive(user.id)}
                          >
                            {user.isActive ? "Online" : "Activate"}
                          </Button>
                        </td>
                        <td>
                          <Button
                            className={
                              user.isAdmin
                                ? "btn btn-success"
                                : "btn btn-danger"
                            }
                            onClick={() => toggleIsAdmin(user.id)}
                          >
                            {user.isAdmin ? " Admin" : "User"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ListAcc;
