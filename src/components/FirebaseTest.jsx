import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const FirebaseTest = () => {
    const { isFirebaseAvailable, currentUser, loginWithGoogle, logout } = useAuth();

    const handleTestLogin = async () => {
        try {
            await loginWithGoogle();
            console.log('Test login berhasil');
        } catch (error) {
            console.error('Test login gagal:', error);
            alert('Login gagal: ' + error.message);
        }
    };

    const handleTestLogout = async () => {
        try {
            await logout();
            console.log('Test logout berhasil');
        } catch (error) {
            console.error('Test logout gagal:', error);
        }
    };

    return (
        <div style={{ 
            position: 'fixed', 
            bottom: '20px', 
            right: '20px', 
            padding: '15px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '12px',
            maxWidth: '250px',
            zIndex: 1000
        }}>
            <h4>Firebase Debug Info:</h4>
            <p><strong>Firebase Available:</strong> {isFirebaseAvailable ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Current User:</strong> {currentUser ? '✅ Logged in' : '❌ Not logged in'}</p>
            {currentUser && (
                <div>
                    <p><strong>User:</strong> {currentUser.displayName}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                </div>
            )}
            
            <div style={{ marginTop: '10px' }}>
                {!currentUser ? (
                    <button 
                        onClick={handleTestLogin}
                        disabled={!isFirebaseAvailable}
                        style={{ 
                            padding: '5px 10px', 
                            fontSize: '11px',
                            marginRight: '5px'
                        }}
                    >
                        Test Login
                    </button>
                ) : (
                    <button 
                        onClick={handleTestLogout}
                        style={{ 
                            padding: '5px 10px', 
                            fontSize: '11px',
                            marginRight: '5px'
                        }}
                    >
                        Test Logout
                    </button>
                )}
            </div>

            <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
                <p>API Key: {import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</p>
                <p>Project ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</p>
                <p>Auth Domain: {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</p>
            </div>
        </div>
    );
};

export default FirebaseTest;
