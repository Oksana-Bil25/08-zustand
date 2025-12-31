import React from 'react';
import css from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: ButtonProps) {
  const buttonClass = `${css.button} ${variant === 'outline' ? css.outline : ''} ${className || ''}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}