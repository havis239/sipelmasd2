import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const createLaporan = async (laporanData) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/laporan`, laporanData);
  return data;
};

const BuatLaporanPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    kategori: 'Infrastruktur',
    lokasi: '',
  });

  const mutation = useMutation({
    mutationFn: createLaporan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laporans'] });
      alert('Laporan berhasil dibuat!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error creating laporan:', error);
      alert('Gagal membuat laporan. Silakan coba lagi.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Anda harus login terlebih dahulu');
      return;
    }

    mutation.mutate({
      ...formData,
      pelapor_id: currentUser.uid, // Firebase user ID
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
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
    textarea: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      minHeight: '120px',
      resize: 'vertical',
    },
    select: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: 'white',
    },
    button: {
      padding: '15px',
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
    warning: {
      padding: '15px',
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '4px',
      color: '#856404',
      textAlign: 'center',
      marginBottom: '20px',
    },
  };

  if (!currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.warning}>
          Anda harus login sebagai masyarakat untuk membuat laporan.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Buat Laporan Baru</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="judul" style={styles.label}>
            Judul Laporan *
          </label>
          <input
            type="text"
            id="judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Masukkan judul laporan..."
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="kategori" style={styles.label}>
            Kategori *
          </label>
          <select
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Layanan Publik">Layanan Publik</option>
            <option value="Lingkungan">Lingkungan</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="lokasi" style={styles.label}>
            Lokasi Kejadian *
          </label>
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="deskripsi" style={styles.label}>
            Deskripsi Laporan *
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            style={styles.textarea}
            placeholder="Jelaskan secara detail masalah atau keluhan yang ingin Anda laporkan..."
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          style={{
            ...styles.button,
            ...(mutation.isLoading ? styles.buttonDisabled : {}),
          }}
        >
          {mutation.isLoading ? 'Mengirim...' : 'Kirim Laporan'}
        </button>
      </form>
    </div>
  );
};

export default BuatLaporanPage;
