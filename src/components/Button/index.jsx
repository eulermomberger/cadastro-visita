import './styles.css';

export function Button({ title, backgroundColor }) {
  return (
    <button
      className='button-container'
      style={{ backgroundColor: backgroundColor || '#6933FF' }}
    >
      {title}
    </button>
  );
}
