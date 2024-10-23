import './Todolist.css';
import React, { useState } from 'react';
import { Task } from './types';
import { Title } from './components/Title';
import { TaskList } from './components/TaskList';
import { CurrentDate } from './components/CurrentDate';
import { TaskForm } from './components/TaskForm';

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    if (taskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        dateCompleted: '',
        completed: false,
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  };

  const removeTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              dateCompleted: task.completed ? '' : new Date().toLocaleString(),
            }
          : task
      )
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  React.useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(tasks);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Title title="Just do it !" level="h1" />
      <TaskForm onAddTask={addTask} />
      <CurrentDate />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        removeTask={removeTask}
        clearAllTasks={clearAllTasks}
      />
    </>
  );
};

export default TodoApp;
