import './styles.css';

import { MdSearch } from 'react-icons/md';

export function SearchInput() {
  return (
    <div className='search-container'>
      <input
        className='search-input'
        placeholder='Buscar cadastro'
      />

      <MdSearch
        color='#FFF'
        size='24px'
      />
    </div>
  );
}
