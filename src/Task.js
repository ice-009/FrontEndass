import React from 'react';

const Task = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleStatusChange = (e) => {
    const updatedTask = { ...task, status: e.target.value };
    onUpdateTask(task.id, updatedTask);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <select value={task.status} onChange={handleStatusChange}>
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
