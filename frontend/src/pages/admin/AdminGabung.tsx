import { useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface Member {
  id: number;
  fullName: string;
  nik: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  profession: string;
  status: string;
  createdAt: string;
}

const AdminGabung = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/members');
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pendaftaran Anggota (Kader)</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola data pengajuan KTA dari simpatisan.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Data Diri</th>
                <th className="p-4 font-medium">Kontak & Alamat</th>
                <th className="p-4 font-medium">Profesi</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
              ) : members.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada data pendaftar.</td></tr>
              ) : (
                members.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-800 dark:text-white">{m.fullName}</div>
                      <div className="text-xs text-gray-500">NIK: {m.nik}</div>
                      <div className="text-xs text-gray-500">Lahir: {m.dob}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{m.phone}</div>
                      <div className="text-xs text-gray-500">{m.email}</div>
                      <div className="text-xs text-gray-400 mt-1 truncate max-w-[200px]" title={m.address}>{m.address}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{m.profession}</span>
                    </td>
                    <td className="p-4">
                      {m.status === 'APPROVED' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><CheckCircle size={12}/> Aktif</span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Clock size={12}/> Menunggu Verifikasi</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {m.status === 'PENDING' && (
                        <button onClick={() => handleUpdateStatus(m.id, 'APPROVED')} className="px-3 py-1.5 bg-brand-red text-white hover:bg-red-700 rounded-md transition text-xs font-bold uppercase tracking-wider">
                          Setujui KTA
                        </button>
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

export default AdminGabung;
