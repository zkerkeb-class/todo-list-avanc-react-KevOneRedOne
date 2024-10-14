import React, { useState } from 'react';
import './index.module.css';

interface TaskFormProps {
  id: number;
  title: string;
  completed: boolean;
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

  // stocker la valeur de l'input dans le state
  // ajouter la tâche au state de la liste des tâches
  // vider l'input

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Add a new task to do."
      />
      <button type="submit">Do it.</button>
    </form>
  );
};

export default TaskForm;
