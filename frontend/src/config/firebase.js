import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDiYB5g7c3UbDiF99-8Y5eHQAzQOVCn5ZI",
    authDomain: "studywise-ai-44033.firebaseapp.com",
    projectId: "studywise-ai-44033",
    storageBucket: "studywise-ai-44033.firebasestorage.app",
    messagingSenderId: "240806259166",
    appId: "1:240806259166:web:1b7e99b2bf2084c59cd54f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;