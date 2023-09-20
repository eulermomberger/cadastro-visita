import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';

import { Button } from '../Button';

import { initialInputValidity, initialInputValues } from '../../helpers/initialStates';
import { firestore } from '../../firebase';

import './styles.css';

export const Modal = ({
  isOpen,
  onClose,
  title,
  visitorUuid = null,
}) => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [inputValidity, setInputValidity] = useState(initialInputValidity);

  const handleInputChange = (event, inputName) => {
    setInputValues({ ...inputValues, [inputName]: event.target.value });
    setInputValidity({ ...inputValidity, [inputName]: event.target.value.trim() !== '' });
  };

  const handleSetHasCar = () => {
    setInputValues({ ...inputValues, hasCar: !inputValues.hasCar })
  };

  const handleSave = async () => {
    const inputValids = {
      ...inputValues,
      inputName: inputValues.inputName.length > 0,
      inputRg: inputValues.inputRg.length === 10,
      inputCpf: inputValues.inputCpf.length === 14,
      inputPhoneNumber: inputValues.inputPhoneNumber.length === 15,
    };

    setInputValidity(inputValids);

    // Verificar se todos os campos obrigatórios são válidos
    const isFormValid = Object.values(inputValids).every((valid) => valid);

    if (isFormValid) {
      // Se não possuir o uuid do visitante, criar um novo
      if (!visitorUuid) {
        await addDoc(collection(firestore, 'visitors'), {
          name: inputValues.inputName,
          rg: String(inputValues.inputRg),
          cpf: String(inputValues.inputCpf),
          phone_number: String(inputValues.inputPhoneNumber),
          gender: inputValues.selectedGender || null,
          resident_relationship: inputValues.selectedRelation || null,
          permission: parseInt(inputValues.selectedPermission, 10),
          hasCar: inputValues.hasCar,
          license_plate: inputValues.hasCar ? inputValues.inputLicensePlate : null,
          car_color: inputValues.hasCar ? inputValues.inputCarColor : null,
          car_model: inputValues.hasCar ? inputValues.inputCarModel : null,
          updated_at: serverTimestamp(),
        });
      }

      // Após a ação bem-sucedida, feche o popup
      onClose();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  };

  useEffect(() => {
    setInputValues(initialInputValues);
    setInputValidity(initialInputValidity);
  }, [isOpen]);

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
                  className={inputValidity.inputName ? '' : 'invalid-input'}
                />
              </div>

              <div className="row">
                <InputMask
                  mask="9999999999"
                  maskChar=""
                  value={inputValues.inputRg}
                  onChange={(e) => handleInputChange(e, 'inputRg')}
                >
                  {() => (
                    <input
                      type="text"
                      placeholder="RG"
                      className={inputValidity.inputRg ? '' : 'invalid-input'}
                    />
                  )}
                </InputMask>

                <InputMask
                  mask="999.999.999-99"
                  maskChar=""
                  value={inputValues.inputCpf}
                  onChange={(e) => handleInputChange(e, 'inputCpf')}
                >
                  {() => (
                    <input
                      type="text"
                      placeholder="CPF"
                      className={inputValidity.inputCpf ? '' : 'invalid-input'}
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
                >
                  {() => (
                    <input
                      type="text"
                      placeholder="Telefone"
                      className={inputValidity.inputPhoneNumber ? '' : 'invalid-input'}
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
                    onChange={(e) => handleInputChange(e, 'inputLicensePlate')}
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
