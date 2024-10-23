import './Todolist.css';
import React from 'react';
import { useTasks } from './hooks/useTasks';
import { Title } from './components/Title';
import { TaskList } from './components/TaskList';
import { CurrentDate } from './components/CurrentDate';
import { TaskForm } from './components/TaskForm';

const TodoApp: React.FC = () => {
  const {
    tasks,
    addTask,
    removeTask,
    toggleTask,
    clearAllTasks,
    setFilterTasks,
  } = useTasks();

  return (
    <>
      <Title title="Just do it !" level="h1" />
      <TaskForm onAddTask={addTask} />
      <CurrentDate />
      <div className="div">
        <button onClick={() => setFilterTasks('all')}>All</button>
        <button onClick={() => setFilterTasks('completed')}>Completed</button>
        <button onClick={() => setFilterTasks('incomplete')}>Incomplete</button>
      </div>
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
