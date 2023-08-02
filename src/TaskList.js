import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ newTask }) => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <div key={task.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{task.heading}</h3>
            <p className="card-text">{task.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
