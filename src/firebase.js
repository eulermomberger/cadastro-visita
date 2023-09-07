import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDkw47besuK3xYJjF47jYJkLTOrAHlHQa8',
  authDomain: 'cadastro-visita.firebaseapp.com',
  projectId: 'cadastro-visita',
  storageBucket: 'cadastro-visita.appspot.com',
  messagingSenderId: '921951177625',
  appId: '1:921951177625:web:5cf116fb844756b4a4e108'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
