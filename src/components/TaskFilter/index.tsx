import React from 'react';
import styles from './index.module.css';
import FilterIcon from '../../assets/icon/filter.svg';

interface TaskFilterProps {
  setFilterTasks: (filter: 'all' | 'completed' | 'incomplete') => void;
  isTaskListEmpty: boolean;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  setFilterTasks,
  isTaskListEmpty,
}) => {
  if (isTaskListEmpty) {
    return null;
  } else {
    return (
      <div className={styles.selectContainer}>
        <img className={styles.selectIcon} src={FilterIcon} alt="filter-icon" />
        <select
          className={styles.selectSection}
          onChange={e =>
            setFilterTasks(e.target.value as 'all' | 'completed' | 'incomplete')
          }
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    );
  }
};
