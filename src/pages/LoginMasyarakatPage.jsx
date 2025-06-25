import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginMasyarakatPage = () => {
    const { currentUser, loginWithGoogle, isFirebaseAvailable, loading } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect jika sudah login
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);    const handleGoogleLogin = async () => {
        if (!isFirebaseAvailable) {
            setError('Firebase tidak dikonfigurasi. Login Google tidak tersedia.');
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            console.log('Memulai login dengan Google...');
            const result = await loginWithGoogle();
            console.log('Login berhasil:', result);
            navigate('/');
        } catch (error) {
            console.error('Login Google gagal:', error);
            setError(error.message || 'Login Google gagal. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
        },
        logo: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#667eea',
            marginBottom: '10px',
        },
        title: {
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '8px',
        },
        subtitle: {
            color: '#666',
            marginBottom: '40px',
            fontSize: '1rem',
            lineHeight: '1.5',
        },
        googleButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            padding: '16px 24px',
            backgroundColor: '#fff',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '24px',
        },
        googleButtonHover: {
            backgroundColor: '#f8f9fa',
            borderColor: '#667eea',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
        },
        googleButtonDisabled: {
            backgroundColor: '#f5f5f5',
            color: '#999',
            cursor: 'not-allowed',
            transform: 'none',
            boxShadow: 'none',
        },
        googleIcon: {
            width: '20px',
            height: '20px',
        },
        error: {
            backgroundColor: '#fee',
            color: '#c53030',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid #fed7d7',
        },
        divider: {
            display: 'flex',
            alignItems: 'center',
            margin: '30px 0',
            color: '#999',
            fontSize: '14px',
        },
        dividerLine: {
            flex: 1,
            height: '1px',
            backgroundColor: '#e0e0e0',
        },
        dividerText: {
            padding: '0 16px',
        },
        adminLink: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#667eea',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 20px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
        },
        adminLinkHover: {
            backgroundColor: '#f0f2ff',
        },
        features: {
            textAlign: 'left',
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8f9ff',
            borderRadius: '12px',
        },
        featuresTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '12px',
        },
        featuresList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        featureItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#555',
        },
        checkIcon: {
            color: '#48bb78',
            fontSize: '16px',
        },
        warningBox: {
            backgroundColor: '#fffbeb',
            border: '1px solid #fed7aa',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
        },
        warningTitle: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '4px',
        },
        warningText: {
            fontSize: '13px',
            color: '#a16207',
            lineHeight: '1.4',
        },
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div>Memuat...</div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.logo}>🏛️ SiPelMasD</div>
                <h1 style={styles.title}>Login Masyarakat</h1>
                <p style={styles.subtitle}>
                    Masuk dengan akun Google Anda untuk membuat laporan dan melacak status pengaduan
                </p>

                {!isFirebaseAvailable && (
                    <div style={styles.warningBox}>
                        <div style={styles.warningTitle}>⚠️ Firebase Tidak Dikonfigurasi</div>
                        <div style={styles.warningText}>
                            Login Google tidak tersedia karena Firebase belum dikonfigurasi. 
                            Silakan hubungi administrator untuk mengaktifkan fitur ini.
                        </div>
                    </div>
                )}

                {error && <div style={styles.error}>{error}</div>}

                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading || !isFirebaseAvailable}
                    style={{
                        ...styles.googleButton,
                        ...(isLoading || !isFirebaseAvailable ? styles.googleButtonDisabled : {}),
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading && isFirebaseAvailable) {
                            Object.assign(e.target.style, styles.googleButtonHover);
                        }
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.target.style, styles.googleButton);
                    }}
                >
                    {isLoading ? (
                        <>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid #f3f3f3',
                                borderTop: '2px solid #667eea',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                            }} />
                            Menghubungkan...
                        </>
                    ) : (
                        <>
                            <svg style={styles.googleIcon} viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Masuk dengan Google
                        </>
                    )}
                </button>

                <div style={styles.features}>
                    <div style={styles.featuresTitle}>Dengan login Anda bisa:</div>
                    <ul style={styles.featuresList}>
                        <li style={styles.featureItem}>
                            <span style={styles.checkIcon}>✓</span>
                            Membuat laporan pengaduan masyarakat
                        </li>
                        <li style={styles.featureItem}>
                            <span style={styles.checkIcon}>✓</span>
                            Melacak status laporan Anda
                        </li>
                        <li style={styles.featureItem}>
                            <span style={styles.checkIcon}>✓</span>
                            Menerima notifikasi update laporan
                        </li>
                        <li style={styles.featureItem}>
                            <span style={styles.checkIcon}>✓</span>
                            Melihat riwayat laporan yang pernah dibuat
                        </li>
                    </ul>
                </div>

                <div style={styles.divider}>
                    <div style={styles.dividerLine}></div>
                    <div style={styles.dividerText}>atau</div>
                    <div style={styles.dividerLine}></div>
                </div>

                <Link 
                    to="/login" 
                    style={styles.adminLink}
                    onMouseEnter={(e) => {
                        Object.assign(e.target.style, styles.adminLinkHover);
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                    }}
                >
                    👨‍💼 Login sebagai Admin/Petugas
                </Link>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default LoginMasyarakatPage;
