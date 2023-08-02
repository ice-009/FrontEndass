import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({ heading: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://interntaskmanagement.onrender.com/api/tasks', task);
      onAddTask(response.data);
      setTask({ heading: '', content: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Heading:</label>
        <input
          type="text"
          name="heading"
          value={task.heading}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter heading"
          required
        />
      </div>
      <div className="form-group">
        <label>Content:</label>
        <textarea
          name="content"
          value={task.content}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter content"
          rows="4"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
