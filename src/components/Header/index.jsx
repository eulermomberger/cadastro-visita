import './styles.css';

import { Button } from '../Button';
import { SearchInput } from '../SearchInput';

export function Header() {
  return (
    <div className='header-container'>
      <img
        src='/logo.svg'
        alt='Logo da aplicação - Três prédios e ao lado o título cadastro visita'
      />

      <div className='header-search'>
        <SearchInput/>
      </div>

      <Button
        title='Cadastrar novo visitante'
      />
    </div>
  );
}
