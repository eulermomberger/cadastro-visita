import React from 'react';
import './styles.css';

export function Button({ title, backgroundColor, onClick }) {
  return (
    <button className="button-container" style={{ backgroundColor: backgroundColor || '#6933FF' }} onClick={onClick}>
      {title}
    </button>
  );
}
