import React from 'react';

import './styles.css';

import { SearchInput } from '../SearchInput';
import { Button } from '../Button';

export function Header({ setVisitors, openModal, setModalTitle }) {
  const handleOpenModal = () => {
    setModalTitle('Cadastrar novo visitante');
    openModal();
  };

  return (
    <div className='header-container'>
      <img
        src='/logo.svg'
        alt='Logo da aplicação - Três prédios e ao lado o título cadastro visita'
      />

      <div className='header-search'>
        <SearchInput setVisitors={setVisitors} />
      </div>

      <div className="popup-button-container">
        <Button
          title='Cadastrar novo visitante'
          backgroundColor='#6933FF'
          onClick={handleOpenModal}
        />
      </div>
    </div>
  );
}
