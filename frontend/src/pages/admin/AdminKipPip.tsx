import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';

interface Registration {
  id: number;
  fullName: string;
  nik: string;
  nisn: string;
  schoolName: string;
  programType: string;
  parentName: string;
  address: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}

const AdminKipPip = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/kippip');
      const data = await res.json();
      setRegistrations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/kippip/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchRegistrations();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Disetujui</span>;
      case 'REJECTED': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={12}/> Ditolak</span>;
      default: return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12}/> Menunggu</span>;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manajemen KIP & PIP</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola data pendaftaran bantuan pendidikan masyarakat.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Data Siswa</th>
                <th className="p-4 font-medium">Program / Sekolah</th>
                <th className="p-4 font-medium">Orang Tua & Kontak</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
              ) : registrations.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada data pendaftaran.</td></tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-800 dark:text-white">{reg.fullName}</div>
                      <div className="text-xs text-gray-500">NIK: {reg.nik}</div>
                      <div className="text-xs text-gray-500">NISN: {reg.nisn}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-brand-red">{reg.programType}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{reg.schoolName}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{reg.parentName}</div>
                      <div className="text-xs text-gray-500">{reg.phoneNumber}</div>
                      <div className="text-xs text-gray-400 mt-1 truncate max-w-[200px]" title={reg.address}>{reg.address}</div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(reg.status)}
                    </td>
                    <td className="p-4 text-right">
                      {reg.status === 'PENDING' && (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleUpdateStatus(reg.id, 'APPROVED')} className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-md transition" title="Setujui">
                            <CheckCircle size={16} />
                          </button>
                          <button onClick={() => handleUpdateStatus(reg.id, 'REJECTED')} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition" title="Tolak">
                            <XCircle size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminKipPip;
