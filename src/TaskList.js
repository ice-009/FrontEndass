import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ newTask }) => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ heading: '', content: '' });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get('https://interntaskmanagement.onrender.com/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, [newTask]);

  const handleEditClick = (id, heading, content) => {
    setEditTaskId(id);
    setEditTaskData({ heading, content });
  };

  const handleUpdateTask = async (id) => {
    try {
      await axios.put(`https://interntaskmanagement.onrender.com/api/tasks/${id}`, editTaskData);
      setEditTaskId(null);
      setEditTaskData({ heading: '', content: '' });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://interntaskmanagement.onrender.com/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <div key={task.id} className="card mb-3">
          <div className="card-body">
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskData.heading}
                  onChange={(e) =>
                    setEditTaskData((prevData) => ({ ...prevData, heading: e.target.value }))
                  }
                />
                <textarea
                  value={editTaskData.content}
                  onChange={(e) =>
                    setEditTaskData((prevData) => ({ ...prevData, content: e.target.value }))
                  }
                  rows="3"
                />
                <button onClick={() => handleUpdateTask(task.id)} className="btn btn-success mr-2">
                  Save
                </button>
                <button onClick={() => setEditTaskId(null)} className="btn btn-secondary">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="card-title">{task.heading}</h3>
                <p className="card-text">{task.content}</p>
                <button
                  onClick={() => handleEditClick(task.id, task.heading, task.content)}
                  className="btn btn-primary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
