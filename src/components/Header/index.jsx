import React, { useState } from 'react';
import './styles.css';
import { Popup } from '../Popup';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';

export function Header({ setVisitors }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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

      <Button
        title='Cadastrar novo visitante'
        backgroundColor='#6933FF'
        onClick={togglePopup}
      />

      {isPopupOpen && (
        <Popup
        title={'Cadastrar Novo Visitante'}
          backgroundColor='#FFFFFF'
          onClose={togglePopup}
        >
         
        </Popup>
      )}
    </div>
  );
}
