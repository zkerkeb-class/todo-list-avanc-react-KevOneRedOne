import { useEffect, useState } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  return {
    tasks,
    addTask,
    removeTask,
    toggleTask,
    clearAllTasks,
  };
};
