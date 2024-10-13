import React, { useState } from 'react';
import './taskForm.module.css';

interface TaskFormProps {
  addTask: (task: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Add a new task to do"
      />
      <button type="submit">Do it.</button>
    </form>
  );
};

export default TaskForm;
