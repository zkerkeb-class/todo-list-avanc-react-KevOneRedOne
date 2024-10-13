import './Todolist.css';
import React, { useState } from 'react';
// import TaskForm from './components/TaskForm';
import { Title } from './components/Title';

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
      {taskName === null || (taskName === '' && tasks.length === 0) ? (
        <p>Enter your first task to do !</p>
      ) : (
        ''
      )}
      <input
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Enter task"
        onKeyDown={handleKeyDown}
      />
      {/* disable button */}
      <button disabled={taskName === null || taskName === ''} onClick={addTask}>
        Add Task
      </button>
      {/* <button onClick={addTask}>Add Task</button> */}

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.name}
              {task.completed ? ` - Completed on ${task.dateCompleted}` : ''}
            </span>
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;