import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import styles from './index.module.css';

interface TaskFormProps {
  onAddTask: (taskName: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName('');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleAddTask}>
      <TextInput
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Add a task to do."
      />
      <Button
        type="submit"
        disabled={taskName.trim() === ''}
        variant="text-primary"
      >
        Do it.
      </Button>
    </form>
  );
};
