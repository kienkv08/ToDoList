import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {} from "react-router-dom";

const CreateTaskPopup = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "date") {
      setDate(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const taskObj = {
      id: 0,
      userId: 1,
      title: taskName,
      summary: description,
      date: date,
      isDone: false,
    };
    save(taskObj);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
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
            className="form-control"
            value={date}
            onChange={handleChange}
            name="date"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;