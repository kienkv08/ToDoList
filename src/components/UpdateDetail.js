import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toDoListId, setTodoDetail] = useState();
  const [detail, setDetail] = useState({
    name: "",
    timeAt: "",
    timeTo: "",
    description: "",
    isDone: false,
  });

  useEffect(() => {
    fetch(`http://localhost:9999/to_do_list_detail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9999/to_do_list_detail/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detail),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Detail updated successfully");
        navigate("/todo/detail/" + id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Edit Detail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={detail.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time At:</label>
          <input
            type="text"
            name="timeAt"
            value={detail.timeAt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time To:</label>
          <input
            type="text"
            name="timeTo"
            value={detail.timeTo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={detail.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Status:</label>
          <input
            type="checkbox"
            name="isDone"
            checked={detail.isDone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditDetail;
