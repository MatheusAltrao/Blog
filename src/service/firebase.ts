import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB6XJI0icpLDPrfAEthvk0GRQItoRvNmO4',
    authDomain: 'matheusblog-9b82f.firebaseapp.com',
    projectId: 'matheusblog-9b82f',
    storageBucket: 'matheusblog-9b82f.appspot.com',
    messagingSenderId: '479485912342',
    appId: '1:479485912342:web:f4f1eed0d16f7c72d95c37',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
