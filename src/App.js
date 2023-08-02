import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  const [newTask, setNewTask] = useState(null);

  const handleAddTask = (task) => {
    setNewTask(task); // Update newTask state with the newly added task
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList newTask={newTask} />
    </div>
  );
}

export default App;
