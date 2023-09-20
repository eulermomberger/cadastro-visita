import React, { useState } from 'react';
import InputMask from 'react-input-mask';

import { Button } from '../Button';

import './styles.css';

const Popup = ({ isOpen, onClose, children, title }) => {
  const [inputValues, setInputValues] = useState({
    inputName: '',
    inputRg: '',
    inputCpf: '',
    inputPhoneNumber: '',
    selectedGender: '',
    selectedRelation: '',
    selectedPermission: '',
    hasCar: false,
    inputLicensePlate: '',
    inputCarColor: '',
    inputCarModel: '',
  });

  const [inputValidity, setInputValidity] = useState({
    inputName: true,
    inputRg: true,
    inputCpf: true,
    inputPhoneNumber: true,
    selectedGender: true,
    selectedRelation: true,
    selectedPermission: true,
    inputLicensePlate: true,
    inputCarColor: true,
    inputCarModel: true,
  });

  const handleInputChange = (event, inputName) => {
    setInputValues({ ...inputValues, [inputName]: event.target.value });
    setInputValidity({ ...inputValidity, [inputName]: event.target.value.trim() !== '' });
  };

  const handleSetHasCar = () => {
    setInputValues({ ...inputValues, hasCar: !inputValues.hasCar })
  };

  const handleSave = () => {
    // Verificar se todos os campos obrigatórios são válidos
    const isFormValid = Object.values(inputValidity).every((valid) => valid);

    if (isFormValid) {
      // ...
      // Após a ação bem-sucedida, feche o popup
      onClose();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2 className="popup-title">
                {title}
              </h2>
              <span className="close-icon" onClick={onClose}>
                &#10006;
              </span>
            </div>

            <div className="popup-body">
              <div className="row">
                <input
                  type="text"
                  placeholder="Nome"
                  value={inputValues.inputName}
                  onChange={(e) => handleInputChange(e, 'inputName')}
                  className={!inputValidity.inputName && 'invalid-input'}
                />
              </div>

              <div className="row">
                <InputMask
                  mask="9999999999"
                  maskChar=""
                  value={inputValues.inputRg}
                  onChange={(e) => handleInputChange(e, 'inputRg')}
                  className={!inputValidity.inputRg && 'invalid-input'}
                >
                  {() => (
                    <input
                      type="text"
                      placeholder="RG"
                    />
                  )}
                </InputMask>

                <InputMask
                  mask="999.999.999-99"
                  maskChar=""
                  value={inputValues.inputCpf}
                  onChange={(e) => handleInputChange(e, 'inputCpf')}
                  className={!inputValidity.inputCpf && 'invalid-input'}
                >
                  {() => (
                    <input
                      type="text"
                      placeholder="CPF"
                    />
                  )}
                </InputMask>
              </div>

              <div className="row">
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar=""
                  value={inputValues.inputPhoneNumber}
                  onChange={(e) => handleInputChange(e, 'inputPhoneNumber')}
                  className={!inputValidity.inputPhoneNumber && 'invalid-input'}
                >
                  {() => (
                    <input
                      type="text"
                      placeholder="Telefone"
                    />
                  )}
                </InputMask>

                <select
                  value={inputValues.selectedGender}
                  onChange={(e) => handleInputChange(e, 'selectedGender')}
                >
                  <option value="" disabled >
                    Gênero
                  </option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value={null}>Outro</option>
                </select>
              </div>

              <div className="row">
                <select
                  value={inputValues.selectedRelation}
                  onChange={(e) => handleInputChange(e, 'selectedRelation')}
                >
                  <option value="" disabled>
                    Relação com o morador
                  </option>
                  <option value="parente">Parente</option>
                  <option value="funcionario">Funcionário</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="row">
                <select
                  value={inputValues.selectedPermission}
                  onChange={(e) => handleInputChange(e, 'selectedPermission')}
                >
                  <option value="" disabled>
                    Permissão de entrada
                  </option>
                  <option value={0}>Bloqueado</option>
                  <option value={1}>Todos os dias</option>
                </select>
              </div>

              <div className="row-checkbox">
                <label
                  className="white-label"
                  onClick={handleSetHasCar}
                >
                  Possui carro
                </label>
                <input
                  type="checkbox"
                  checked={inputValues.hasCar}
                  onChange={handleSetHasCar}
                />
              </div>

              {inputValues.hasCar && (
                <div className="row">
                  <input
                    type="text"
                    placeholder="Placa"
                    value={inputValues.inputLicensePlate}
                    onChange={(e) => handleInputChange(e, 'selectedPermission')}
                  />
                  <input
                    type="text"
                    placeholder="Modelo"
                    value={inputValues.inputCarModel}
                    onChange={(e) => handleInputChange(e, 'inputCarModel')}
                  />
                  <input
                    type="text"
                    placeholder="Cor"
                    value={inputValues.inputCarColor}
                    onChange={(e) => handleInputChange(e, 'inputCarColor')}
                  />
                </div>
              )}
            </div>

            <div className='popup-footer'>
              <Button
                onClick={handleSave}
                title='Salvar'
                backgroundColor='#2D42FF'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Popup;
