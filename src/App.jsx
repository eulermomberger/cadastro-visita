import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';

import { firestore } from './firebase';

import { Header } from './components/Header';
import { VisitorsList } from './components/VisitorsList';
import { Modal } from './components/Modal';

function App() {
  const [visitors, setVisitors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchVisitors = async () => {
    const q = query(collection(firestore, 'visitors'), orderBy('updated_at', 'desc'));
    const visitorSnapshot = await getDocs(q);
    const visitorList = visitorSnapshot.docs.map((doc) => ({ ...doc.data(), uuid: doc.id }));
    setVisitors(visitorList);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <>
      <Header
        setVisitors={setVisitors}
        openModal={openModal}
        setModalTitle={setModalTitle}
      />

      <VisitorsList visitors={visitors}/>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
      />
    </>
  );
}

export default App;
