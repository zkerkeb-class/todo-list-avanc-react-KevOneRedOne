import React from 'react';
import { Button } from '../Button';
import CheckIcon from '../../assets/icon/check.svg';
import CrossIcon from '../../assets/icon/cross.svg';
import DeleteIcon from '../../assets/icon/trash.svg';

type Task = {
  id: number;
  name: string;
  dateCompleted: Date | string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  clearAllTasks: () => void;
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTask,
  removeTask,
  clearAllTasks,
}) => {
  return (
    <>
      {tasks.length > 0 && (
        <>
          <p>
            {tasks.length} tasks to do today -{' '}
            <Button onClick={clearAllTasks} variant="text-secondary">
              Clear All Tasks
            </Button>
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
    </>
  );
};
