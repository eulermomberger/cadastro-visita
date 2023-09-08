import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore/lite';

import { firestore } from './firebase';

import { Header } from './components/Header';
import { VisitorsList } from './components/VisitorsList';

function App() {
  const [visitors, setVisitors] = useState([]);

  const fetchVisitors = async () => {
    const visitorsCollection = collection(firestore, 'visitors');
    const visitorSnapshot = await getDocs(visitorsCollection);
    const visitorList = visitorSnapshot.docs.map((doc) => ({ ...doc.data(), uuid: doc.id }));
    setVisitors(visitorList);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div>
      <Header />

      <VisitorsList visitors={visitors}/>
    </div>
  );
}

export default App;
