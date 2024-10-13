import './Todolist.css';
import React from 'react';
import TaskForm from './components/TaskForm';
import { Title } from './components/Title';

// interface AppProps {

// }

const TodoApp: React.FC = () => {
  return (
    <div>
      <Title title="Just do it !" level="h1" />
      <TaskForm addTask={(task: string) => console.log(task)} />
      {/* task list here */}
    </div>
  );
};

export default TodoApp;
