import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Untuk pengguna Firebase
  const [adminUser, setAdminUser] = useState(null);   // Untuk admin JWT
  const [loading, setLoading] = useState(true);

  // Listener untuk autentikasi Firebase (hanya jika tersedia)
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Jika Firebase tidak tersedia, set loading false
      setLoading(false);
    }
  }, []);
    // Cek token admin dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Cek apakah token sudah expired
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('adminToken');
        } else {
          setAdminUser({ token, ...decodedToken });
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('adminToken');
      }
    }
  }, []);  // Fungsi Login untuk Pengguna Umum (Masyarakat)
  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error('Firebase tidak dikonfigurasi. Login Google tidak tersedia.');
    }
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Login berhasil:', result.user);
      return result;
    } catch (error) {
      console.error('Error saat login dengan Google:', error);
      
      // Handle specific error codes
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login dibatalkan oleh pengguna');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup diblokir oleh browser. Pastikan popup diizinkan.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Permintaan popup dibatalkan');
      } else {
        throw new Error('Login Google gagal: ' + (error.message || 'Unknown error'));
      }
    }
  };
  // Fungsi Login untuk Admin & Petugas
  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      localStorage.setItem('adminToken', data.token);
      setAdminUser(data);
      return data;
    } catch (error) {
      console.error("Login admin gagal:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Fungsi Logout (untuk kedua tipe user)
  const logout = () => {
    // Logout dari Firebase (jika tersedia)
    if (auth) {
      signOut(auth);
    }
    // Logout dari admin
    localStorage.removeItem('adminToken');
    setAdminUser(null);
  };
  const value = {
    currentUser,
    adminUser,
    loading,
    isFirebaseAvailable: !!auth,
    loginWithGoogle,
    adminLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};