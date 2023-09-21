import React from 'react';

import './styles.css';

export function AlertConfirm({ isOpen, onCancel, onConfirm, title, description }) {
  return (
    <>
      {isOpen && (
        <div className='backdrop-alert'>
          <div className='alert-container'>
            <div className='alert-header'>
              <h2 className='alert-title'>
                {title}
              </h2>
            </div>

            <div className='alert-body'>
              <span>{description}</span>
            </div>

            <div className='alert-footer'>
              <button
                className='alert-button alert-button-cancel'
                onClick={onCancel}
              >
                Cancelar
              </button>
              <button
                className='alert-button alert-button-confirm'
                onClick={onConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
