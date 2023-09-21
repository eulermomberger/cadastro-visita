import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore/lite';

import { Button } from '../Button';

import { initialInputValidity, initialInputValues } from '../../helpers/initialStates';
import { firestore } from '../../firebase';

import './styles.css';

export const Modal = ({
  isOpen,
  onClose,
  title,
  setVisitors,
  visitorUuid = null,
}) => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [inputValidity, setInputValidity] = useState(initialInputValidity);
  const [visitor, setVisitor] = useState(null);

  const handleInputChange = (event, inputName) => {
    setInputValues({ ...inputValues, [inputName]: event.target.value });
    setInputValidity({ ...inputValidity, [inputName]: event.target.value.trim() !== '' });
  };

  const handleSetHasCar = () => {
    setInputValues({ ...inputValues, hasCar: !inputValues.hasCar })
  };

  const getVisitorValues = () => ({
    name: inputValues.inputName,
    rg: String(inputValues.inputRg),
    cpf: String(inputValues.inputCpf),
    phone_number: String(inputValues.inputPhoneNumber),
    gender: inputValues.selectedGender || null,
    resident_relationship: inputValues.selectedRelation || null,
    permission: parseInt(inputValues.selectedPermission, 10),
    has_car: inputValues.hasCar,
    license_plate: inputValues.hasCar ? inputValues.inputLicensePlate : null,
    car_color: inputValues.hasCar ? inputValues.inputCarColor : null,
    car_model: inputValues.hasCar ? inputValues.inputCarModel : null,
    updated_at: serverTimestamp(),
  });

  const handleSave = async () => {
    const inputValids = {
      ...inputValidity,
      inputName: inputValues.inputName.length > 0,
      inputRg: inputValues.inputRg.length >= 7 && inputValues.inputRg.length <= 11,
      inputCpf: inputValues.inputCpf.length === 14,
      inputPhoneNumber: inputValues.inputPhoneNumber.length === 15,
      selectedGender: !!inputValues.selectedGender,
      selectedRelation: !!inputValues.selectedRelation,
      selectedPermission: inputValues.selectedPermission !== null && inputValues.selectedPermission !== '',
    };

    setInputValidity(inputValids);

    // Verificar se todos os campos obrigatórios são válidos
    const isFormValid = Object.values(inputValids).every((valid) => valid);

    if (isFormValid) {
      // Se não possuir o uuid do visitante, criar um novo
      if (!visitorUuid) {
        const docRef = await addDoc(collection(firestore, 'visitors'), getVisitorValues());
        const docSnap = await getDoc(docRef);

        setVisitors((oldState) => [{ ...docSnap.data(), uuid: docSnap.id }, ...oldState]);
      } else { // Se possuir, atualizar
        const docRef = doc(firestore, 'visitors', visitorUuid);
        await updateDoc(docRef, getVisitorValues());
        const docSnap = await getDoc(docRef);

        setVisitors((oldState) => {
          const visitors = oldState.filter((visitor) => visitor.uuid !== visitorUuid);

          return [{ ...docSnap.data(), uuid: docSnap.id }, ...visitors];
        });
      }

      // Após a ação bem-sucedida, feche o popup
      onClose();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  };

  const fetchVisitor = async () => {
    const docRef = doc(firestore, 'visitors', visitorUuid);
    const docSnap = await getDoc(docRef);

    const visitorValues = docSnap.data();
    setVisitor({ ...visitorValues, uuid: docSnap.id });

    setInputValues({
      inputName: visitorValues.name,
      inputRg: visitorValues.rg,
      inputCpf: visitorValues.cpf,
      inputPhoneNumber: visitorValues.phone_number,
      selectedGender: visitorValues.gender,
      selectedRelation: visitorValues.resident_relationship,
      selectedPermission: visitorValues.permission,
      hasCar: visitorValues.has_car,
      inputLicensePlate: visitorValues.license_plate,
      inputCarColor: visitorValues.car_color,
      inputCarModel: visitorValues.car_model,
    });
  };

  useEffect(() => {
    setInputValues(initialInputValues);
    setInputValidity(initialInputValidity);
    setVisitor(null);

    if (isOpen && visitorUuid) {
      fetchVisitor();
    }
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
                  mask="99999999999"
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
