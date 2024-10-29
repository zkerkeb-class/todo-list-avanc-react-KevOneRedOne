import React, { useMemo } from 'react';
import styles from './index.module.css';
import { Button } from '../Button';
import { TaskFilter } from '../TaskFilter';
import { useTasksContext } from '../../context/tasksContext';
import Clear from '../../assets/icon/clear.svg';
import { TaskItem } from '../TaskItem';

export const TaskList: React.FC = React.memo(() => {
  const { tasks, clearAllTasks, toggleTask, removeTask, hasPendingTasks } =
    useTasksContext();

  const tasksStatus = useMemo(
    () => (hasPendingTasks ? 'to do' : 'done'),
    [hasPendingTasks]
  );

  return (
    <div className={styles.taskSection}>
      <div className={styles.taskHeader}>
        <h3 className={styles.taskHeaderSubTitle}>
          {tasks.length} tasks {tasksStatus} today
        </h3>
        <div className={styles.taskHeaderActions}>
          <TaskFilter />
          {tasks.length > 0 && (
            <Button
              onClick={clearAllTasks}
              variant="icon"
              icon={Clear}
              deleteButton={true}
            />
          )}
        </div>
      </div>
      {tasks.length > 0 && (
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              removeTask={removeTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
});

TaskList.displayName = 'TaskList';
