import './Todolist.css';
import React, { useState } from 'react';
import { Title } from './components/Title';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { TaskList } from './components/TaskList';
import { CurrentDate } from './components/CurrentDate';

type Task = {
  id: number;
  name: string;
  dateCompleted: Date | string;
  completed: boolean;
};

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');

  const addTask = () => {
    if (taskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        dateCompleted: '',
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
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
      <TextInput
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Add a task to do."
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={addTask}
        disabled={taskName.trim() === ''}
        variant="text"
      >
        Do it.
      </Button>
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
