import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px',
        },
        hero: {
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            color: 'white',
            marginBottom: '40px',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '16px',
        },
        subtitle: {
            fontSize: '1.2rem',
            opacity: '0.9',
            lineHeight: '1.6',
        },
        section: {
            marginBottom: '40px',
        },
        sectionTitle: {
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '16px',
        },
        text: {
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#555',
            marginBottom: '16px',
        },
        featureGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
        },
        featureCard: {
            padding: '24px',
            backgroundColor: '#f8f9ff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
        },
        featureIcon: {
            fontSize: '2rem',
            marginBottom: '12px',
        },
        featureTitle: {
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '8px',
        },
        featureText: {
            fontSize: '0.95rem',
            color: '#666',
            lineHeight: '1.6',
        },
        techStack: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
        },
        techCard: {
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        techTitle: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '12px',
        },
        techList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        techItem: {
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '4px',
        },
        ctaSection: {
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: '#f8f9ff',
            borderRadius: '12px',
        },
        ctaTitle: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '16px',
        },
        ctaButtons: {
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
        },
        button: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'background-color 0.2s',
        },
        buttonSecondary: {
            backgroundColor: 'transparent',
            color: '#667eea',
            border: '2px solid #667eea',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.hero}>
                <h1 style={styles.title}>🏛️ Tentang SiPelMasD</h1>
                <p style={styles.subtitle}>
                    Sistem Pelaporan Masyarakat Digital - Platform modern untuk menyalurkan aspirasi dan keluhan masyarakat kepada pemerintah
                </p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Apa itu SiPelMasD?</h2>
                <p style={styles.text}>
                    SiPelMasD (Sistem Pelaporan Masyarakat Digital) adalah platform digital yang memungkinkan masyarakat 
                    untuk melaporkan berbagai permasalahan dan memberikan aspirasi kepada pemerintah dengan mudah dan transparan. 
                    Platform ini dikembangkan untuk meningkatkan pelayanan publik dan mempermudah komunikasi antara masyarakat dan pemerintah.
                </p>
                <p style={styles.text}>
                    Dengan menggunakan teknologi modern seperti React, Node.js, MongoDB, dan GraphQL, SiPelMasD menyediakan 
                    pengalaman pengguna yang responsif dan sistem yang dapat diandalkan untuk mengelola laporan masyarakat.
                </p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Fitur Utama</h2>
                <div style={styles.featureGrid}>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>👤</div>
                        <h3 style={styles.featureTitle}>Autentikasi Ganda</h3>
                        <p style={styles.featureText}>
                            Login Google untuk masyarakat umum dan login khusus untuk admin/petugas dengan sistem keamanan berlapis.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>📝</div>
                        <h3 style={styles.featureTitle}>Pelaporan Mudah</h3>
                        <p style={styles.featureText}>
                            Interface yang intuitif untuk membuat laporan dengan kategori yang jelas dan upload foto pendukung.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>📊</div>
                        <h3 style={styles.featureTitle}>Dashboard Admin</h3>
                        <p style={styles.featureText}>
                            Panel kontrol lengkap untuk admin dan petugas mengelola laporan dengan update status real-time.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🔍</div>
                        <h3 style={styles.featureTitle}>Filtering Canggih</h3>
                        <p style={styles.featureText}>
                            Sistem pencarian dan filtering dengan GraphQL untuk menemukan laporan berdasarkan kategori dan status.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🔒</div>
                        <h3 style={styles.featureTitle}>Keamanan Tinggi</h3>
                        <p style={styles.featureText}>
                            Perlindungan XSS, JWT authentication, dan enkripsi password untuk menjaga keamanan data pengguna.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>📱</div>
                        <h3 style={styles.featureTitle}>Responsive Design</h3>
                        <p style={styles.featureText}>
                            Desain yang responsif dan user-friendly, dapat diakses dengan nyaman dari berbagai perangkat.
                        </p>
                    </div>
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Teknologi yang Digunakan</h2>
                <div style={styles.techStack}>
                    <div style={styles.techCard}>
                        <h3 style={styles.techTitle}>Frontend</h3>
                        <ul style={styles.techList}>
                            <li style={styles.techItem}>• React 19 dengan Vite</li>
                            <li style={styles.techItem}>• Apollo Client (GraphQL)</li>
                            <li style={styles.techItem}>• TanStack Query</li>
                            <li style={styles.techItem}>• React Router DOM</li>
                            <li style={styles.techItem}>• Firebase Authentication</li>
                        </ul>
                    </div>
                    <div style={styles.techCard}>
                        <h3 style={styles.techTitle}>Backend</h3>
                        <ul style={styles.techList}>
                            <li style={styles.techItem}>• Node.js dengan Express</li>
                            <li style={styles.techItem}>• MongoDB dengan Mongoose</li>
                            <li style={styles.techItem}>• GraphQL API</li>
                            <li style={styles.techItem}>• JWT Authentication</li>
                            <li style={styles.techItem}>• bcryptjs untuk enkripsi</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={styles.ctaSection}>
                <h2 style={styles.ctaTitle}>Mulai Gunakan SiPelMasD</h2>
                <p style={styles.text}>
                    Bergabunglah dengan ribuan masyarakat yang telah menggunakan SiPelMasD untuk menyampaikan aspirasi dan keluhan mereka.
                </p>
                <div style={styles.ctaButtons}>
                    <Link to="/login-masyarakat" style={styles.button}>
                        👤 Login sebagai Masyarakat
                    </Link>
                    <Link to="/login" style={{...styles.button, ...styles.buttonSecondary}}>
                        👨‍💼 Login sebagai Petugas
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
