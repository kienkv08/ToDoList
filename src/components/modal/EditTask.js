import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-use-history";
import { useNavigate } from "react-router";

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [date, setDate] = useState("");

  const history = useHistory();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  useEffect(() => {
    setTaskName(taskObj.title);
    setDescription(taskObj.summary);
    setDate(taskObj.date);
    setId(taskObj.id);
    setUserId(taskObj.userId);
  }, [taskObj]);

  const handleUpdate = (e) => {
    e.preventDefault();
    let tempObj = {};
    tempObj["title"] = taskName;
    tempObj["summary"] = description;
    tempObj["date"] = date;
    tempObj["id"] = id;
    tempObj["userId"] = userId;
    updateTask(tempObj);
    navigate("/homepage"); // Navigate back to the home page
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Summary</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            rows="5"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name="date"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
