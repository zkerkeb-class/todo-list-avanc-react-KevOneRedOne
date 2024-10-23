// import styles from './index.module.css';
import React from 'react';

export const CurrentDate: React.FC = () => {
  const formattedDate = new Date().toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return <p>{formattedDate}</p>;
};
