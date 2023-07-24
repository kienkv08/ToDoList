import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-use-history";
import {
  ChatSquareDots,
  PenFill,
  PencilSquare,
  ThreeDots,
  Trash,
} from "react-bootstrap-icons";
import EditTaskPopup from "./modal/EditTask";
import { Link } from "react-router-dom";

const Card = ({ taskObj, index, deleteTask, updateTask, id }) => {
  const [modal, setModal] = useState(false);
  const history = useHistory();

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

  const toggle = () => {
    setModal(!modal);
  };

  const handleUpdate = (updatedTaskObj) => {
    updateTask(taskObj.id, updatedTaskObj); // Pass the task ID along with the updatedTaskObj
    history.push("/"); // Navigate back to the home page
  };

  const handleDelete = () => {
    deleteTask(taskObj.id); // Pass the task ID for deletion
  };

  return (
    <div className="card-wrapper mr-5">
      <a style={{ textAlign: "center", fontSize: "18px" }}>{taskObj.date}</a>
      <div
        className="card-top"
        style={{ backgroundColor: colors[index % 5].primaryColor }}
      ></div>
      <div className="task-holder">
        <Link
          to={"/todo/detail/" + id}
          style={{ fontSize: "16px" }}
          className="bootstrap-icon"
        >
          <ThreeDots />
        </Link>
        <span
          className="card-header"
          style={{
            backgroundColor: colors[index % 5].secondaryColor,
            borderRadius: "10px",
          }}
        >
          {taskObj.title}
        </span>
        <p className="mt-3">{taskObj.summary}</p>
        <p>{taskObj.date}</p> {/* Thêm trường ngày */}
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <PencilSquare
            style={{
              color: colors[index % 5].primaryColor,
              cursor: "pointer",
              marginLeft: "50px",
            }}
            onClick={() => setModal(true)}
          />
          <Trash
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          />
        </div>
      </div>
      <EditTaskPopup
        modal={modal}
        toggle={toggle}
        updateTask={handleUpdate}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
