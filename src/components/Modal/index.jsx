// src/components/Popup.js

import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './styles.css';

const Popup = ({  isOpen,onClose, children, title }) => {
    const [inputValues, setInputValues] = useState({
        inputValue1: '',
        inputValue2: '',
        inputValue3: '',
        inputValue4: '',
        inputValue5: '',
        inputValue6: '',
        inputValue7: '',
        inputValue8: '',
        inputValue9: '', 
        inputValue10: '', 
        selectedGender: '',
        selectedRelation: '',
        hasCar: false,
      });
  
      const [inputValidity, setInputValidity] = useState({
        inputValue1: true,
        inputValue2: true,
        inputValue3: true,
        inputValue4: true,
        inputValue5: true,
        inputValue6: true,
        inputValue7: true,
        inputValue8: true,
        inputValue9: true,
        inputValue10: true,
        inputValue11: true,
        selectedGender: true,
        selectedRelation: true,
      });
   
      const handleInputChange = (event, inputName) => {
        setInputValues({ ...inputValues, [inputName]: event.target.value });
        setInputValidity({ ...inputValidity, [inputName]: event.target.value.trim() !== '' });
      };
    
      const handleGenderChange = (event) => {
        setInputValues({ ...inputValues, selectedGender: event.target.value });
        setInputValidity({ ...inputValidity, selectedGender: event.target.value.trim() !== '' });
      };
    
      const handleRelationChange = (event) => {
        setInputValues({ ...inputValues, selectedRelation: event.target.value });
        setInputValidity({ ...inputValidity, selectedRelation: event.target.value.trim() !== '' });
      };
      const isFormValid = () => {
        for (const key in inputValidity) {
          if (!inputValidity[key] && inputValues[key].trim() === '') {
            return false;
          }
        }
        return true;
      };
      const handleSave = () => {
        // Verificar se todos os campos obrigatórios são válidos
        const isFormValid = Object.values(inputValidity).every((valid) => valid);
    
        if (isFormValid) {
          // Realize a ação desejada (por exemplo, salvar os dados)
          // ...
          // Após a ação bem-sucedida, feche o popup
          onClose();
        } else {
          // Se algum campo obrigatório não for válido, defina o estado de erro de validação como true
          alert('Por favor, preencha todos os campos obrigatórios!');        }
      };
  return (
    <div>
    {isOpen && (
      <div className="popup">
        <div className="popup-content">
          <div className="popup-header">
            <h2 className="popup-title">
              {title}
              <span className="close-icon" onClick={onClose}>
                &#10006;
              </span>
            </h2>
          </div>
          <div className="input-container">
            <div className="column">
              <input
                type="text"
                placeholder="Nome"
                value={inputValues.inputValue1}
                onChange={(e) => handleInputChange(e, 'inputValue1')}
                className={inputValidity.inputValue1 ? '' : 'invalid-input'}
              
                style={{ width: '840px' }}
              />
            </div>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <input
                type="text"
                placeholder="RG"
                value={inputValues.inputValue2}
                onChange={(e) => handleInputChange(e, 'inputValue2')}
                className={inputValidity.inputValue2 ? '' : 'invalid-input'}
                style={{ width: '410px' }}
              />
              <InputMask
                mask="999.999.999-99"
                maskChar=""
                value={inputValues.inputValue3}
                onChange={(e) => handleInputChange(e, 'inputValue3')}
                className={inputValidity.inputValue3 ? '' : 'invalid-input'}
              >
                {() => (
                  <input
                    type="text"
                    placeholder="CPF"
                    style={{ width: '410px' }}
                  />
                )}
              </InputMask>
            </div>
          </div>
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <InputMask
              mask="(99) 99999-9999"
              maskChar=""
              value={inputValues.inputValue4}
              onChange={(e) => handleInputChange(e, 'inputValue4')}
              className={inputValidity.inputValue4 ? '' : 'invalid-input'}
            >
              {() => (
                <input
                  type="text"
                  placeholder="Telefone"
                  style={{ width: '400px' }}
                />
              )}
            </InputMask>
            <select
              className='gender-select'
              value={inputValues.selectedGender}
              onChange={handleGenderChange}
              style={{ width: '420px' }}
            >
              <option value="" disabled >
                Gênero
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <select
            className='relation-select'
            value={inputValues.selectedRelation}
            onChange={handleRelationChange}
            style={{ width: '860px' }}
          >
            <option value="" disabled >
              Relação com o Morador
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>

          <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <InputMask
              mask="(99) 99999-9999"
              maskChar=""
              value={inputValues.inputValue7}
              onChange={(e) => handleInputChange(e, 'inputValue7')}
              className={inputValidity.inputValue7 ? '' : 'invalid-input'}

              
            >
              {() => (
                <input
                  type="text"
                  placeholder="Telefone"
                  style={{ width: '410px' }}
                />
              )}
            </InputMask>
            <input
              type="date"
              placeholder=""
              value={inputValues.inputValue8}
              onChange={(e) => handleInputChange(e, 'inputValue8')}
              className={inputValidity.inputValue8 ? '' : 'invalid-input'}

              style={{ width: '410px' }}
            />
          </div>
          <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '15px' }}>
            <label className="white-label">Possui carro</label>
            <input
              type="checkbox"
              checked={inputValues.hasCar} 
              onChange={() => setInputValues({ ...inputValues, hasCar: !inputValues.hasCar })}
            />
          </div>
          
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Placa"
              value={inputValues.inputValue9}
              onChange={(e) => handleInputChange(e, 'inputValue9')}
              
              style={{ width: '266.66px' }}
            />
            <input
              type="text"
              placeholder="Modelo"
              value={inputValues.inputValue10} // Corrigindo o valor aqui
              onChange={(e) => handleInputChange(e, 'inputValue10')} // Corrigindo o nome aqui
              style={{ width: '266.66px' }}
            />
            <input
              type="text"
              placeholder="Cor"
              value={inputValues.inputValue11} // Adicionando um novo campo
              onChange={(e) => handleInputChange(e, 'inputValue11')} // Adicionando um novo nome
              style={{ width: '266.66px' }}
            />
          </div>
          <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '70px' }}>
            <button
              className="save-button"
              onClick={handleSave}
              disabled={!isFormValid()} 
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}


export default Popup;
