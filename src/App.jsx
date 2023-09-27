import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { firestore } from './firebase';

import { Header } from './components/Header';
import { VisitorsList } from './components/VisitorsList';
import { Modal } from './components/Modal';

function App() {
  const [visitors, setVisitors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [visitorUuid, setVisitorUuid] = useState(null);

  const openModal = (title, uuid = null) => {
    setModalTitle(title);
    setVisitorUuid(uuid);
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
      <></>
      <Header
        setVisitors={setVisitors}
        openModal={openModal}
      />

      <VisitorsList
        visitors={visitors}
        openModal={openModal}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        setVisitors={setVisitors}
        visitors={visitors}
        visitorUuid={visitorUuid}
      />

      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  );
}

export default App;
