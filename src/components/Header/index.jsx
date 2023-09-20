import React, { useState } from 'react';
import './styles.css';
import { SearchInput } from '../SearchInput';
import { Button } from '../Button';
import Popup from '../Modal'; 

export function Header({ setVisitors }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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
          onClick={openPopup}
        />
        <Popup isOpen={isPopupOpen} onClose={closePopup}  title='Cadastrar novo visitante'>
       
      </Popup>
      </div>
    </div>
  );
}
