import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { currentUser, adminUser, logout, loginWithGoogle, isFirebaseAvailable } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleGoogleLogin = async () => {
        if (!isFirebaseAvailable) {
            alert('Firebase tidak dikonfigurasi. Login Google tidak tersedia.');
            return;
        }
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Login Google gagal:', error);
            alert('Login Google gagal. Silakan coba lagi.');
        }
    };

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem 2rem', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}>
            <Link 
                to="/" 
                style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                🏛️ SiPelMasD
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {adminUser ? (
                    <>
                        <Link 
                            to="/admin/dashboard" 
                            style={{ 
                                marginRight: '1rem',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '500',
                            }}
                        >
                            Dashboard Admin
                        </Link>
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Logout ({adminUser.nama || adminUser.email})
                        </button>
                    </>
                ) : currentUser ? (
                    <>
                        <Link 
                            to="/buat-laporan" 
                            style={{ 
                                marginRight: '1rem',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '500',
                            }}
                        >
                            Buat Laporan
                        </Link>
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Logout ({currentUser.displayName})
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login-masyarakat" 
                            style={{ 
                                marginRight: '1rem',
                                padding: '8px 16px',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: '#667eea',
                                textDecoration: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Login Masyarakat
                        </Link>
                        <Link 
                            to="/login"
                            style={{
                                padding: '8px 16px',
                                border: '1px solid rgba(255,255,255,0.7)',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Login Petugas
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
