import { useEffect, useState, useMemo } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterTasks, setFilterTasks] = useState<
    'all' | 'completed' | 'incomplete'
  >('all');

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

  const filteredTasks = useMemo(() => {
    switch (filterTasks) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filterTasks]);

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

  const isTaskListEmpty = useMemo(() => {
    return tasks.length === 0;
  }, [filteredTasks]);

  const hasPendingTasks = tasks.some(task => !task.completed);

  const clearAllTasks = () => {
    setTasks([]);
  };

  return {
    tasks: filteredTasks,
    addTask,
    removeTask,
    toggleTask,
    clearAllTasks,
    setFilterTasks,
    hasPendingTasks,
    isTaskListEmpty,
  };
};
