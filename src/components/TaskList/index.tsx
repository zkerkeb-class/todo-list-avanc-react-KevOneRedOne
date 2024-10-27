import React, { useMemo } from 'react';
import styles from './index.module.css';
import { Task } from '../../types';
import { Button } from '../Button';
import { TaskFilter } from '../TaskFilter';
import Clear from '../../assets/icon/clear.svg';
import CheckIcon from '../../assets/icon/check.svg';
import CrossIcon from '../../assets/icon/cross.svg';
import DeleteIcon from '../../assets/icon/trash.svg';

type TaskListProps = {
  tasks: Task[];
  clearAllTasks: () => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  setFilterTasks: (filter: 'all' | 'completed' | 'incomplete') => void;
  hasPendingTasks: boolean;
  isTaskListEmpty: boolean;
};

// Disable prop-types validation for this file
/* eslint-disable react/prop-types */

export const TaskList: React.FC<TaskListProps> = React.memo(
  ({
    tasks,
    clearAllTasks,
    toggleTask,
    removeTask,
    setFilterTasks,
    hasPendingTasks,
    isTaskListEmpty,
  }) => {
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
            <TaskFilter
              setFilterTasks={setFilterTasks}
              isTaskListEmpty={isTaskListEmpty}
            />
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
              <li key={task.id} className={styles.taskItem}>
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
                <div className={styles.taskActions}>
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
        )}
      </div>
    );
  }
);

TaskList.displayName = 'TaskList';
