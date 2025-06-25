import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchLaporans = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/laporan`);
  return data;
};

const updateLaporanStatus = async ({ id, status, token }) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_URL}/laporan/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const DashboardPage = () => {
  const { adminUser } = useAuth();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState({});

  const { data: laporans, isLoading, error } = useQuery({
    queryKey: ['laporans'],
    queryFn: fetchLaporans,
  });

  const mutation = useMutation({
    mutationFn: updateLaporanStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laporans'] });
    },
  });

  const handleStatusUpdate = (laporanId) => {
    const status = selectedStatus[laporanId];
    if (status && adminUser?.token) {
      mutation.mutate({
        id: laporanId,
        status,
        token: adminUser.token,
      });
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '12px',
      textAlign: 'left',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #eee',
    },
    select: {
      padding: '5px',
      marginRight: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '6px 12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Diterima':
        return { backgroundColor: '#e3f2fd', color: '#1565c0' };
      case 'Diproses':
        return { backgroundColor: '#fff3e0', color: '#e65100' };
      case 'Selesai':
        return { backgroundColor: '#e8f5e8', color: '#2e7d32' };
      case 'Ditolak':
        return { backgroundColor: '#ffebee', color: '#c62828' };
      default:
        return { backgroundColor: '#f5f5f5', color: '#424242' };
    }
  };

  if (!adminUser) {
    return <div>Anda harus login sebagai admin untuk mengakses halaman ini.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Dashboard Admin</h1>
        <p>Selamat datang, {adminUser.nama || adminUser.email}!</p>
        <p>Kelola laporan masyarakat dari sini.</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Judul</th>
            <th style={styles.th}>Kategori</th>
            <th style={styles.th}>Lokasi</th>
            <th style={styles.th}>Status Saat Ini</th>
            <th style={styles.th}>Ubah Status</th>
            <th style={styles.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {laporans?.map((laporan) => (
            <tr key={laporan._id}>
              <td style={styles.td}>{laporan.judul}</td>
              <td style={styles.td}>{laporan.kategori}</td>
              <td style={styles.td}>{laporan.lokasi}</td>
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.statusBadge,
                    ...getStatusColor(laporan.status),
                  }}
                >
                  {laporan.status}
                </span>
              </td>
              <td style={styles.td}>
                <select
                  style={styles.select}
                  value={selectedStatus[laporan._id] || ''}
                  onChange={(e) =>
                    setSelectedStatus({
                      ...selectedStatus,
                      [laporan._id]: e.target.value,
                    })
                  }
                >
                  <option value="">Pilih Status</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onClick={() => handleStatusUpdate(laporan._id)}
                  disabled={
                    !selectedStatus[laporan._id] || mutation.isLoading
                  }
                >
                  {mutation.isLoading ? 'Updating...' : 'Update'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
