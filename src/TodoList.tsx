import './Todolist.css';
import React, { useState } from 'react';
// import TaskForm from './components/TaskForm';

import { Title } from './components/Title';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';

import CheckIcon from './assets/icon/check.svg';
import CrossIcon from './assets/icon/cross.svg';
import DeleteIcon from './assets/icon/trash.svg';

// export default TodoApp;

// setp 1 : create a task form
// step 2 : create a task list
// step 3 : create a task item
// step 4 : create a task item list
// step 5 : create a task item list container

// use use Memo to avoid re-rendering of the task list
// use use callback to avoid re-rendering of the task item list container

// use use context to avoid prop drilling

// persist the task list in the local storage with use effect

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
    <div>
      <Title title="Just do it !" level="h1" />
      {/* {taskName === null || (taskName === '' && tasks.length === 0) ? (
        <Title title='Enter your first task to do !' level='h4' />
      ) : (tasks.length > 0) ? (
        <Title title={`You have ${tasks.length} tasks to do !`} level="h3" />
      ): null} */}
      {/* <Title title={`You have ${tasks.length} tasks to do !`} level="h3" /> */}
      <br />
      <TextInput
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Add a task to do."
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={addTask}
        disabled={taskName === null || taskName === ''}
        variant="text"
      >
        Do it.
      </Button>
      <br />
      <br />
      {/* afficher la date - nombre de tache à faire dans la journée */}
      <p>
        {new Date().toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </p>
      {tasks.length > 0 && (
        <>
          <p>
            {tasks.length} tasks to do today -{' '}
            <button onClick={clearAllTasks}>Clear All Tasks</button>
          </p>

          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.name}
                  {task.completed
                    ? ` - Completed on ${task.dateCompleted}`
                    : ''}
                </span>
                <div>
                  <Button
                    onClick={() => toggleTask(task.id)}
                    icon={task.completed ? CrossIcon : CheckIcon}
                    variant="icon"
                  />
                  <Button
                    onClick={() => removeTask(task.id)}
                    icon={DeleteIcon}
                    variant="icon"
                    deleteButton={true}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoApp;
