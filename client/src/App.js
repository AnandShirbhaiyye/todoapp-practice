import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tasks, setTasks] = useState([]);

  const loadTask = async () => {
    const { data } = await axios.get("/tasks");
    setTasks(data?.data);
  };
  useEffect(() => {
    loadTask();
  }, []);

  const addTask = async () => {
    const { data } = await axios.post("/task", {
      title: title,
      description: description,
    });
    alert(data?.message);
    setTitle("");
    setDescription("");
    loadTask();
  };

  const deleteTask = async (taskId) => {
    const {data} = await axios.post('/task/delete',{
      taskId: taskId
    })
    alert(data?.message);
    loadTask();
    
  };


  return (
    <>
      <div className="container">
        <div className="card shadow-lg mt-5 p-5">
          <div className="text-center mb-4">
            <h2>ToDoApp✅</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm p-3 mt-5">
                <form>
                  <h4 className="text-center mt-3 mb-4">➕Add Tasks</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Discription"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    className="btn btn-warning w-100 mb-3"
                    type="button"
                    onClick={addTask}
                  >
                    {" "}
                    <b>AddTask</b>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="todo-container shadow-sm p-3 mt-2">
                <h4 className="text-center mt-2 mb-4">All Tasks📃</h4>
                {tasks.map((task) => {
                  return (
                    <div className="card shadow-sm p-1 mt-2">
                      <h5>{task?.title}</h5>
                      <p>{task?.description}</p>
                      <span
                        className="delete-button"
                        onClick={() => {
                          deleteTask(task?._id);
                        }}
                      >
                        {" "}
                       ❌
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
