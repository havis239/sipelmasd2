import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DOMPurify from 'dompurify'; // Kebutuhan #4: Proteksi XSS

const fetchLaporanById = async (id) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/laporan/${id}`);
    return data;
};

const LaporanDetailPage = () => {
    const { id } = useParams();
    const { data: laporan, isLoading, error } = useQuery({
        queryKey: ['laporan', id],
        queryFn: () => fetchLaporanById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Kebutuhan #4: Sanitasi input HTML sebelum ditampilkan
    const sanitizedDeskripsi = DOMPurify.sanitize(laporan.deskripsi);

    return (
        <div>
            <h1>{laporan.judul}</h1>
            <p><strong>Status:</strong> {laporan.status}</p>
            <p><strong>Kategori:</strong> {laporan.kategori}</p>
            <p><strong>Lokasi:</strong> {laporan.lokasi}</p>
            <hr />
            <h3>Deskripsi Laporan:</h3>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDeskripsi }} />
        </div>
    );
};

export default LaporanDetailPage;