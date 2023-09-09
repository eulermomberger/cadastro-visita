import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore/lite';

import { firestore } from './firebase';

import { Header } from './components/Header';
import { VisitorsList } from './components/VisitorsList';

function App() {
  const [visitors, setVisitors] = useState([]);

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
    <div>
      <Header
        setVisitors={setVisitors}
      />

      <VisitorsList visitors={visitors}/>
    </div>
  );
}

export default App;
