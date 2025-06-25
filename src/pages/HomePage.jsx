import React, { useState } from 'react';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { useQuery as useApolloQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import axios from 'axios';

// GraphQL Query
const GET_LAPORAN_FILTERED = gql`
    query Laporans($status: String) {
        laporans(status: $status) {
            _id
            judul
            status
            kategori
            tanggal
            pelapor
            ringkasan
        }
    }
`;

const fetchLaporans = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/laporan`);
    return data.map(l => ({
        ...l,
        tanggal: l.tanggal || new Date().toISOString().slice(0,10),
        pelapor: l.pelapor || "Anonim",
        ringkasan: l.ringkasan || "Tidak ada ringkasan.",
    }));
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '48px auto',
        padding: '0',
        background: '#f8fafc',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
    },
    hero: {
        textAlign: 'center',
        padding: '56px 32px 40px 32px',
        background: 'linear-gradient(120deg, #6366f1 0%, #06b6d4 100%)',
        color: 'white',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        position: 'relative',
        zIndex: 1,
    },
    heading: {
        fontSize: '2.8rem',
        fontWeight: 800,
        marginBottom: '10px',
        letterSpacing: '-1px',
    },
    heroDesc: {
        fontSize: '1.15rem',
        opacity: 0.98,
        marginBottom: '18px',
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    heroContact: {
        fontSize: '1rem',
        marginTop: '10px',
        opacity: 0.9,
    },
    heroActions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '18px',
        marginTop: '32px',
        flexWrap: 'wrap',
    },
    heroBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '13px 28px',
        background: 'white',
        color: '#6366f1',
        textDecoration: 'none',
        borderRadius: '10px',
        fontWeight: 700,
        fontSize: '17px',
        boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
        border: 'none',
        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
    },
    heroBtnAlt: {
        background: 'transparent',
        color: 'white',
        border: '2px solid rgba(255,255,255,0.8)',
        boxShadow: 'none',
    },
    filterWrap: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '36px 0 18px 0',
        padding: '0 32px',
    },
    select: {
        padding: '10px 16px',
        borderRadius: '10px',
        border: '1.5px solid #cbd5e1',
        fontSize: '1rem',
        background: '#f1f5f9',
        outline: 'none',
        transition: 'border 0.2s',
        fontWeight: 500,
        minWidth: '160px',
    },
    list: {
        listStyle: 'none',
        padding: '0 32px 32px 32px',
        margin: 0,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '22px',
    },
    listItem: {
        background: 'white',
        borderRadius: '14px',
        padding: '22px 24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.15s, box-shadow 0.15s',
        border: '1.5px solid #e0e7ef',
        cursor: 'pointer',
        position: 'relative',
    },
    listItemHover: {
        transform: 'translateY(-2px) scale(1.01)',
        boxShadow: '0 6px 24px rgba(99,102,241,0.10)',
        border: '1.5px solid #6366f1',
    },
    laporanTitle: {
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '7px',
        fontSize: '1.15rem',
        letterSpacing: '-0.5px',
    },
    laporanMeta: {
        fontSize: '1rem',
        color: '#64748b',
        marginTop: '2px',
        fontWeight: 500,
    },
    badge: {
        display: 'inline-block',
        padding: '3px 12px',
        borderRadius: '8px',
        fontSize: '0.95rem',
        fontWeight: 600,
        marginRight: '10px',
        background: '#f1f5f9',
        color: '#6366f1',
        border: '1px solid #e0e7ef',
    },
    statusBadge: {
        fontWeight: 700,
        fontSize: '1rem',
        padding: '4px 16px',
        borderRadius: '12px',
        marginRight: '10px',
        border: '2px solid',
        display: 'inline-block',
    },
    laporanFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '18px',
    },
    ringkasan: {
        color: '#334155',
        fontSize: '1.05rem',
        margin: '10px 0 0 0',
        opacity: 0.95,
    },
    detailBtn: {
        background: '#6366f1',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '7px 18px',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background 0.2s',
    },
    kategoriIcon: {
        marginRight: '6px',
        fontSize: '1.1em',
    },
    subheading: {
        color: '#334155',
        marginTop: '36px',
        marginBottom: '16px',
        fontSize: '1.25rem',
        fontWeight: 700,
        letterSpacing: '-0.5px',
    },
    loading: {
        color: '#64748b',
        fontStyle: 'italic',
        margin: '32px 0',
        textAlign: 'center',
    },
    footer: {
        background: '#e0e7ef',
        color: '#334155',
        textAlign: 'center',
        padding: '18px 0',
        fontSize: '1rem',
        marginTop: 'auto',
    }
};

const statusColors = {
    Diterima: { background: '#fef9c3', color: '#b45309', border: '#fde68a' },
    Diproses: { background: '#dbeafe', color: '#1d4ed8', border: '#93c5fd' },
    Selesai: { background: '#dcfce7', color: '#15803d', border: '#86efac' },
};

const kategoriIcons = {
    Infrastruktur: '🛣️',
    Kesehatan: '🏥',
    Pendidikan: '🎓',
    Sosial: '🤝',
    Lainnya: '📄',
};

const LaporanCard = ({ laporan }) => {
    const [hover, setHover] = useState(false);
    const statusStyle = statusColors[laporan.status] || {};
    const kategoriIcon = kategoriIcons[laporan.kategori] || kategoriIcons.Lainnya;
    return (
        <li
            style={{
                ...styles.listItem,
                ...(hover ? styles.listItemHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                <span
                    style={{
                        ...styles.statusBadge,
                        background: statusStyle.background,
                        color: statusStyle.color,
                        borderColor: statusStyle.border || '#e0e7ef',
                    }}
                >
                    {laporan.status}
                </span>
                <span style={styles.laporanMeta}>
                    {new Date(laporan.tanggal).toLocaleDateString('id-ID')}
                </span>
            </div>
            <span style={styles.laporanTitle}>{laporan.judul}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <span style={styles.badge}>
                    <span style={styles.kategoriIcon}>{kategoriIcon}</span>
                    {laporan.kategori}
                </span>
                <span style={styles.laporanMeta}>
                    Pelapor: <b>{laporan.pelapor}</b>
                </span>
            </div>
            <div style={styles.ringkasan}>
                {laporan.ringkasan}
            </div>
            <div style={styles.laporanFooter}>
                <Link to={`/laporan/${laporan._id}`} style={styles.detailBtn}>
                    Lihat Detail
                </Link>
            </div>
        </li>
    );
};

const HomePage = () => {
    const [filterStatus, setFilterStatus] = useState('');

    const { data: allLaporans, isLoading: isLoadingAll, error: errorAll } = useReactQuery({
        queryKey: ['laporans'],
        queryFn: fetchLaporans,
    });

    const { data: filteredLaporans, loading: isLoadingFiltered, error: errorFiltered } = useApolloQuery(GET_LAPORAN_FILTERED, {
        variables: { status: filterStatus },
        skip: !filterStatus,
    });

    const laporansToDisplay = filterStatus ? filteredLaporans?.laporans : allLaporans;
    const isLoading = isLoadingAll || isLoadingFiltered;

    if (errorAll) {
        return <div style={styles.container}>Error loading data: {errorAll.message}</div>;
    }
    if (errorFiltered) {
        console.error('GraphQL error:', errorFiltered);
    }

    return (
        <div style={styles.container}>
            <div style={styles.hero}>
                <h1 style={styles.heading}>🏛️ SiPelMasD</h1>
                <p style={styles.heroDesc}>
                    Selamat datang di <b>SiPelMasD</b> – Sistem Pelayanan Masyarakat Digital.<br />
                    Sampaikan aspirasi, keluhan, dan saran Anda kepada pemerintah secara mudah, cepat, dan transparan.<br />
                    Kami berkomitmen untuk memberikan pelayanan terbaik demi kemajuan bersama.
                </p>
                <div style={styles.heroContact}>
                    <b>Kontak:</b> 021-12345678 &nbsp;|&nbsp; <b>Email:</b> pelayanan@sipelmasd.go.id
                </div>
                <div style={styles.heroActions}>
                    <Link to="/login-masyarakat" style={styles.heroBtn}>
                        👤 Login & Buat Laporan
                    </Link>
                    <a href="#laporan-list" style={{ ...styles.heroBtn, ...styles.heroBtnAlt }}>
                        📋 Lihat Laporan
                    </a>
                </div>
            </div>

            <div style={styles.filterWrap}>
                <h2 style={styles.subheading} id="laporan-list">Filter Laporan</h2>
                <select
                    onChange={(e) => setFilterStatus(e.target.value)}
                    value={filterStatus}
                    style={styles.select}
                >
                    <option value="">Semua Status</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                </select>
            </div>

            <h2 style={styles.subheading}>Daftar Laporan Masyarakat</h2>
            {isLoading && <p style={styles.loading}>Memuat data...</p>}
            <ul style={styles.list}>
                {laporansToDisplay && laporansToDisplay.map(laporan => (
                    <LaporanCard key={laporan._id} laporan={laporan} />
                ))}
            </ul>
            <footer style={styles.footer}>
                &copy; {new Date().getFullYear()} SiPelMasD – Sistem Pelayanan Masyarakat Digital. <br />
                Pemerintah Kota Contoh. Seluruh hak cipta dilindungi.
            </footer>
        </div>
    );
};

export default HomePage;