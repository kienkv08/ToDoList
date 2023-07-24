import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-use-history";
import axios from "axios";
import { Search } from "react-bootstrap-icons";
import CreateTaskPopup from "./modal/CreateTask";
import EditTaskPopup from "./modal/EditTask";
import Card from "./Card";
import Menu from "./Menu";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterByDate, setFilterByDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:9999/to_do_list");
      setTaskList(response.data);

      let filtered = response.data;

      if (filterByDate === "sevenDays") {
        const sevenDaysAgo = getSevenDaysAgo();
        filtered = filtered.filter((task) => {
          const taskDate = new Date(task.Date);
          return taskDate >= new Date(sevenDaysAgo);
        });
      }

      setFilteredTasks(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/to_do_list/${id}`);
      fetchTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, updatedTaskObj) => {
    try {
      await axios.put(`http://localhost:9999/to_do_list/${id}`, updatedTaskObj);
      fetchTodoList();
      setEditModal(false);
      history.push("/homepage");
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const saveTask = async (taskObj) => {
    try {
      await axios.post("http://localhost:9999/to_do_list", taskObj);
      fetchTodoList();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setEditModal(true);
  };

  const handleFilterByDate = (date) => {
    setFilterByDate(date);
  };

  const getSevenDaysAgo = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return sevenDaysAgo.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchTodoList();
  }, [filterByDate, searchQuery]);

  return (
    <>
      <Menu />
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
        <button
          className="btn btn-primary mt-2 ml-2"
          onClick={() => handleFilterByDate("sevenDays")}
        >
          Filter by 7 days
        </button>
      </div>
      <div className="task-container">
        {filteredTasks.map((obj, index) => (
          <Card
            key={obj.id}
            id={obj.id}
            taskObj={obj}
            index={index}
            deleteTask={deleteTask}
            updateTask={updateTask}
            editTask={editTask}
          />
        ))}
      </div>
      <CreateTaskPopup
        toggle={toggle}
        modal={modal}
        save={saveTask}
        filterByDate={filterByDate}
        handleFilterByDate={handleFilterByDate}
      />
      {selectedTask && (
        <EditTaskPopup
          modal={editModal}
          toggle={toggleEdit}
          updateTask={updateTask}
          taskObj={selectedTask}
        />
      )}
    </>
  );
};

export default TodoList;
