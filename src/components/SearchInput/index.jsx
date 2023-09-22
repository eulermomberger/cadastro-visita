import './styles.css';

import { useEffect, useRef, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore/lite';
import { MdClear, MdLoop, MdSearch } from 'react-icons/md';

import { firestore } from '../../firebase';

export function SearchInput({ setVisitors }) {
  const [inputText, setInputText] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const inputRef = useRef(null);

  const fetchVisitors = async () => {
    const visitorsCollection = collection(firestore, 'visitors');

    // Se o texto digitado não for um número, realiza a consulta pelo campo 'name'
    // Ao contrário realiza a consulta pelo campo 'rg'
    const queryBy = Number.isNaN(parseInt(inputText, 10)) ? 'name' : 'rg';

    let q;
    if (inputText !== '') {
      q = query(
        visitorsCollection,
        where(queryBy, '>=', `${inputText.charAt(0).toUpperCase()}${inputText.slice(1)}`),
        where(queryBy, '<=', `${inputText.charAt(0).toUpperCase()}${inputText.slice(1)}\uf8ff`),
        orderBy(queryBy),
        orderBy('updated_at', 'desc')
      );
    } else {
      q = query(visitorsCollection, orderBy('updated_at', 'desc'));
    }

    const visitorSnapshot = await getDocs(q);
    const visitorList = visitorSnapshot.docs.map((doc) => ({ ...doc.data(), uuid: doc.id }));
    setVisitors(visitorList);

    setIsFetching(false);
  };

  const handleClearInput = () => {
    inputRef.current.value = '';
    setInputText('');
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputText(value);
  };

  useEffect(() => {
    if (inputText === null) return;

    setIsFetching(true);

    // Função que será executada após um atraso de 500ms após a última digitação
    const debounceTimeout = setTimeout(() => {
      fetchVisitors();
    }, 800);

    // Limpar o timeout anterior se o usuário continuar digitando
    return () => clearTimeout(debounceTimeout);
  }, [inputText]);

  const Icon = () => {
    if (isFetching) {
      return (
        <MdLoop
          color='#FFF'
          size='24px'
          className='icon-spin'
        />
      );
    }

    if (inputText) {
      return (
        <MdClear
          color='#FFF'
          size='24px'
          className='icon-pointer'
          onClick={handleClearInput}
        />
      );
    }

    return (
      <MdSearch
        color='#FFF'
        size='24px'
      />
    );
  };

  return (
    <div className='search-container'>
      <input
        className='search-input'
        placeholder='Buscar cadastro'
        ref={inputRef}
        onChange={handleInputChange}
      />

      <Icon />
    </div>
  );
}
