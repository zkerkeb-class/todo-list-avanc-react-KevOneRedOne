import './Todolist.css';
import React from 'react';
import { useTasks } from './hooks/useTasks';
import { Title } from './components/Title';
import { TaskList } from './components/TaskList';
import { CurrentDate } from './components/CurrentDate';
import { TaskForm } from './components/TaskForm';
import { TasksProvider } from './context/tasksContext';

const TodoApp: React.FC = () => {
  const {
    tasks,
    addTask,
    removeTask,
    toggleTask,
    clearAllTasks,
    setFilterTasks,
    hasPendingTasks,
    isTaskListEmpty,
  } = useTasks();

  return (
    <TasksProvider>
      <Title title="Just do it !" level="h1" />
      <TaskForm onAddTask={addTask} />
      <CurrentDate />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        removeTask={removeTask}
        clearAllTasks={clearAllTasks}
        setFilterTasks={setFilterTasks}
        hasPendingTasks={hasPendingTasks}
        isTaskListEmpty={isTaskListEmpty}
      />
    </TasksProvider>
  );
};

export default TodoApp;
