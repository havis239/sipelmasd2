import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            await adminLogin(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Login Gagal. Periksa kembali email dan password Anda.');
        } finally {
            setIsLoading(false);
        }
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '50px auto',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555',
        },
        input: {
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
        },
        button: {
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px',
        },
        buttonDisabled: {
            backgroundColor: '#ccc',
            cursor: 'not-allowed',
        },
        error: {
            color: '#dc3545',
            textAlign: 'center',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
        },
        helpText: {
            fontSize: '14px',
            color: '#666',
            textAlign: 'center',
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login Admin / Petugas</h2>
            
            <div style={styles.helpText}>
                <strong>Untuk testing:</strong><br />
                Email: admin@sipelmasd.com<br />
                Password: admin123
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <div style={styles.error}>{error}</div>}
                
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={styles.input}
                        placeholder="Masukkan email Anda"
                    />
                </div>
                
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={styles.input}
                        placeholder="Masukkan password Anda"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                        ...styles.button,
                        ...(isLoading ? styles.buttonDisabled : {}),
                    }}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;