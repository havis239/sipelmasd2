import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDrJB-wNVgstrjQQC3ZyVHyVoQpMnhTVrU",
    authDomain: "complaintmanagement-c239a.firebaseapp.com",
    projectId: "complaintmanagement-c239a",
    storageBucket: "complaintmanagement-c239a.firebasestorage.app",
    messagingSenderId: "675506627425",
    appId: "1:675506627425:web:b15a85067fd096318e5b20",
    measurementId: "G-CQ5GVXMQ1L"
};

let auth = null;
let googleProvider = null;
let analytics = null;

try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    analytics = getAnalytics(app);
    console.log('Firebase berhasil diinisialisasi');
} catch (error) {
    console.warn('Firebase gagal diinisialisasi:', error.message);
}

export { auth, googleProvider, analytics };
