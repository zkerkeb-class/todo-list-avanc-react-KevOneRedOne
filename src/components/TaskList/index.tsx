import React, { useMemo } from 'react';
import styles from './index.module.css';
import { Button } from '../Button';
import { TaskFilter } from '../TaskFilter';
import { useTasksContext } from '../../context/tasksContext';
import Clear from '../../assets/icon/clear.svg';
import CheckIcon from '../../assets/icon/check.svg';
import CrossIcon from '../../assets/icon/cross.svg';
import DeleteIcon from '../../assets/icon/trash.svg';

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
            <li key={task.id} className={styles.taskItem}>
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.name}
                {task.completed ? ` - Completed on ${task.dateCompleted}` : ''}
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
});

TaskList.displayName = 'TaskList';
