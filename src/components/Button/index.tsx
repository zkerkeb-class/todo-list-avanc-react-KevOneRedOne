import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'text' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  icon,
  variant = 'text',
}) => {
  const className = variant === 'icon' ? styles.iconButton : styles.textButton;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {typeof icon === 'string' && (
        <img className={styles.icon} src={icon} alt="icon" />
      )}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};
