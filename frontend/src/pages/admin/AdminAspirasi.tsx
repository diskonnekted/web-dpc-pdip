import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface Aspiration {
  id: number;
  senderName: string;
  phone: string;
  category: string;
  content: string;
  status: string;
  createdAt: string;
}

const AdminAspirasi = () => {
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAspirations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/aspirations');
      const data = await res.json();
      setAspirations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAspirations();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/aspirations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAspirations();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Layanan Aspirasi Masyarakat</h2>
          <p className="text-gray-500 text-sm mt-1">Pantau dan tindaklanjuti laporan atau saran dari warga.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Memuat data...</div>
        ) : aspirations.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">Belum ada aspirasi masuk.</div>
        ) : (
          aspirations.map((asp) => (
            <div key={asp.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-700 pb-4 md:pb-0 md:pr-6">
                <div className="font-bold text-lg text-gray-800 dark:text-white mb-1">{asp.senderName || 'Anonim'}</div>
                <div className="text-sm text-gray-500 mb-3">{asp.phone}</div>
                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 rounded text-xs font-bold uppercase tracking-wider">
                  {asp.category}
                </div>
              </div>
              <div className="md:w-3/4 flex flex-col justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {asp.content}
                  </p>
                  <div className="text-xs text-gray-400 mt-4">
                    Dikirim pada: {new Date(asp.createdAt).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-end border-t border-gray-100 dark:border-zinc-700 pt-4">
                  <div>
                    {asp.status === 'RESOLVED' ? (
                      <span className="flex items-center gap-1 text-green-600 font-bold text-sm"><CheckCircle size={16}/> Selesai Ditindaklanjuti</span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 font-bold text-sm"><Clock size={16}/> Menunggu / Belum Dibaca</span>
                    )}
                  </div>
                  <div>
                    {asp.status !== 'RESOLVED' && (
                      <button onClick={() => handleUpdateStatus(asp.id, 'RESOLVED')} className="px-4 py-2 bg-brand-red text-white hover:bg-red-700 rounded-md transition font-bold text-sm">
                        Tandai Selesai
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAspirasi;
